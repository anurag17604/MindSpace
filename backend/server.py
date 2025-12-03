# --------------------
# Firebase stalled due to quota issues.
# Backend now demonstrates SQL-based storage with sample dummy rows.
# --------------------

from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone, timedelta
import httpx
import sqlite3
from contextlib import contextmanager


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# SQLite connection
DATABASE_PATH = ROOT_DIR / 'mood_habit.db'

@contextmanager
def get_db():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class Veo3Request(BaseModel):
    prompt: str

class MoodEntry(BaseModel):
    mood_value: int
    mood_label: str
    mood_emoji: str
    notes: str = ""

class HabitCreate(BaseModel):
    name: str

# Initialize database tables
def init_db():
    with get_db() as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS moods (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                mood_value INTEGER NOT NULL,
                mood_label TEXT NOT NULL,
                mood_emoji TEXT NOT NULL,
                notes TEXT,
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.execute('''
            CREATE TABLE IF NOT EXISTS habits (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.execute('''
            CREATE TABLE IF NOT EXISTS habit_completions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                habit_id INTEGER NOT NULL,
                date DATE NOT NULL,
                FOREIGN KEY (habit_id) REFERENCES habits (id)
            )
        ''')
        conn.commit()

init_db()

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)

    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()

    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)

    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])

    return status_checks

@api_router.post("/veo3/generate")
async def generate_veo3_video(request: Veo3Request):
    from openai import OpenAI
    openai_client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
    try:
        result = openai_client.videos.generate(
            model="gpt-4o-video-preview",   # Veo3-level video model
            prompt=request.prompt,
            size="1280x720"
        )

        video_url = result.data[0].url

        return {"success": True, "video_url": video_url}

    except Exception as e:
        return {"success": False, "error": str(e)}

# Mood Tracker API
@api_router.post("/moods")
async def create_mood_entry(entry: MoodEntry):
    with get_db() as conn:
        cursor = conn.execute(
            'INSERT INTO moods (mood_value, mood_label, mood_emoji, notes) VALUES (?, ?, ?, ?)',
            (entry.mood_value, entry.mood_label, entry.mood_emoji, entry.notes)
        )
        mood_id = cursor.lastrowid
        conn.commit()
        return {"id": mood_id, "message": "Mood entry created"}

@api_router.get("/moods")
async def get_mood_entries(days: int = 30):
    cutoff_date = datetime.now() - timedelta(days=days)
    with get_db() as conn:
        rows = conn.execute(
            'SELECT * FROM moods WHERE date >= ? ORDER BY date DESC',
            (cutoff_date.isoformat(),)
        ).fetchall()
        return [dict(row) for row in rows]

# Habit Tracker API
@api_router.post("/habits")
async def create_habit(habit: HabitCreate):
    with get_db() as conn:
        cursor = conn.execute(
            'INSERT INTO habits (name) VALUES (?)',
            (habit.name,)
        )
        habit_id = cursor.lastrowid
        conn.commit()
        return {"id": habit_id, "message": "Habit created"}

@api_router.get("/habits")
async def get_habits():
    with get_db() as conn:
        habits = conn.execute('SELECT * FROM habits ORDER BY created_at DESC').fetchall()
        result = []
        for habit in habits:
            habit_dict = dict(habit)
            # Get completions
            completions = conn.execute(
                'SELECT date FROM habit_completions WHERE habit_id = ?',
                (habit['id'],)
            ).fetchall()
            habit_dict['completions'] = [row['date'] for row in completions]
            result.append(habit_dict)
        return result

@api_router.delete("/habits/{habit_id}")
async def delete_habit(habit_id: int):
    with get_db() as conn:
        conn.execute('DELETE FROM habit_completions WHERE habit_id = ?', (habit_id,))
        conn.execute('DELETE FROM habits WHERE id = ?', (habit_id,))
        conn.commit()
        return {"message": "Habit deleted"}

@api_router.post("/habits/{habit_id}/toggle")
async def toggle_habit_completion(habit_id: int):
    today = datetime.now().date().isoformat()
    with get_db() as conn:
        # Check if already completed today
        existing = conn.execute(
            'SELECT id FROM habit_completions WHERE habit_id = ? AND date = ?',
            (habit_id, today)
        ).fetchone()

        if existing:
            conn.execute(
                'DELETE FROM habit_completions WHERE habit_id = ? AND date = ?',
                (habit_id, today)
            )
        else:
            conn.execute(
                'INSERT INTO habit_completions (habit_id, date) VALUES (?, ?)',
                (habit_id, today)
            )
        conn.commit()
        return {"message": "Habit completion toggled"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
