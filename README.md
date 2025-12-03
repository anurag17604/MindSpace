# MindSpace - Mental Health Support Web Application

A comprehensive, production-ready mental health support platform built with React, featuring AI-powered tools, tracking features, and anonymous community chat.

## 🌟 Features

### 1. **Landing Page**
- Modern hero section with motivational content
- Feature showcase grid
- User testimonials
- Responsive design with glassmorphism effects

### 2. **Text Summary & Analysis**
- AI-powered text summarization
- Sentiment analysis (Positive, Negative, Neutral)
- Key points extraction
- Real-time processing with loading animations

### 3. **Text to Video Generator**
- Multi-step video generation workflow
- Automatic text summarization
- Video creation with placeholder content
- Download functionality

### 4. **Face Emotion Tracker**
- Real-time facial emotion detection using face-api.js
- Webcam integration
- Emotion percentages (Happy, Sad, Angry, Fearful, Disgusted, Surprised, Neutral)
- Historical emotion tracking with charts
- LocalStorage persistence

### 5. **Resources Page**
- Curated mental health resources
- Search functionality
- Category filtering (Articles, Videos, Guides)
- External links to trusted sources

### 6. **Specialist Contact**
- Directory of mental health professionals
- Specialist profiles with expertise, ratings, and pricing
- Request callback modal
- Availability status

### 7. **Mood Tracker**
- Daily mood logging with emoji selection
- Notes and reflections
- Mood timeline chart using Recharts
- Filter by date range (7, 30, 90 days)
- LocalStorage persistence

### 8. **Habit Tracker**
- Create custom habits
- Daily habit completion tracking
- Streak counter
- Completion rate calculation
- LocalStorage persistence

### 9. **Anonymous Chat**
- Real-time chat using Firebase Realtime Database
- Auto-generated anonymous usernames
- Message timestamps
- Safe, judgment-free community space

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/UI (Radix UI)
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Face Detection:** face-api.js
- **Real-time Database:** Firebase Realtime Database
- **Routing:** React Router v7
- **Notifications:** Sonner
- **Storage:** LocalStorage (for offline features)

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account (for chat feature)

### Step 1: Install Dependencies

```bash
cd /app/frontend
yarn install
```

### Step 2: Configure Firebase (For Chat Feature)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Realtime Database
4. Copy your Firebase configuration
5. Update `/app/frontend/src/firebase/config.js` with your credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  databaseURL: "https://your-app-default-rtdb.firebaseio.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### Step 3: Download Face Detection Models

For the Face Emotion Tracker to work, download the face-api.js models:

```bash
cd /app/frontend/public
mkdir models
cd models

# Download the required models
wget https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/tiny_face_detector_model-weights_manifest.json
wget https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/tiny_face_detector_model-shard1
wget https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_expression_model-weights_manifest.json
wget https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_expression_model-shard1
```

Or manually download from: [face-api.js models](https://github.com/justadudewhohacks/face-api.js/tree/master/weights)

### Step 4: Start Development Server

```bash
cd /app/frontend
yarn start
```

The app will open at `http://localhost:3000`

## 🏛️ Project Structure

```
/app/frontend/
├── public/
│   ├── models/              # face-api.js models
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ui/              # Shadcn UI components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── TextSummary.jsx
│   │   ├── VideoGenerator.jsx
│   │   ├── FaceEmotion.jsx
│   │   ├── Resources.jsx
│   │   ├── Specialists.jsx
│   │   ├── MoodTracker.jsx
│   │   ├── HabitTracker.jsx
│   │   └── Chat.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useTheme.js
│   ├── utils/
│   │   └── dummyApis.js
│   ├── firebase/
│   │   └── config.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── tailwind.config.js
```

## 🎨 Design Features

- **Color Palette:** Calming blues, purples, and teals
- **Typography:** Playfair Display (headings) + Inter (body)
- **Effects:**
  - Glassmorphism cards with backdrop blur
  - Smooth gradient backgrounds
  - Rounded-2xl corners
  - Subtle hover animations
  - Framer Motion page transitions
- **Dark Mode:** Full theme toggle support
- **Responsive:** Mobile, tablet, and desktop optimized

## 🔧 Dummy APIs

The app uses dummy API functions for demonstration:
- `generateSummary()` - Text summarization
- `analyzeSentiment()` - Sentiment analysis
- `extractKeyPoints()` - Key points extraction
- `generateVideo()` - Video generation

These can be replaced with real API integrations by updating `/app/frontend/src/utils/dummyApis.js`

## 📦 Deployment

### Netlify

1. Build the project:
```bash
cd /app/frontend
yarn build
```

2. Deploy the `build` folder to Netlify
3. Update Firebase configuration with production settings

### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd /app/frontend
vercel
```

## ✅ Features Checklist

- ✅ Landing Page with hero section
- ✅ Text Summary & Analysis
- ✅ Text to Video Generator
- ✅ Face Emotion Tracker
- ✅ Mental Health Resources
- ✅ Specialist Contact Directory
- ✅ Mood Tracker with charts
- ✅ Habit Tracker with streaks
- ✅ Anonymous Chat (Firebase)
- ✅ Light/Dark Mode Toggle
- ✅ Responsive Design
- ✅ LocalStorage Persistence
- ✅ Framer Motion Animations
- ✅ Premium UI/UX

## 🔥 Team Contribution (3 Members)

### 👤 Arnav Garg
- Implemented Face Emotion Detection UI
- Integrated face-api.js
- Handled model conversion (ONNX)

### 👤 Member 2 (Name)
- Developed Text Summarizer Module
- Integrated DistilBART model APIs
- Added video generation (Veo 3 API)

### 👤 Member 3 (Name)
- Implemented Text Emotion Analysis
- Worked on backend SQL demo
- Chatbot integration and UI polishing

## 📝 Notes

- All offline features use LocalStorage
- Face detection requires webcam access
- Chat requires Firebase configuration
- Models for face-api.js need to be downloaded separately
- All APIs are modular and can be replaced with real implementations

## 💬 Support

For mental health emergencies:
- **National Suicide Prevention Lifeline:** 1-800-273-8255
- **Crisis Text Line:** Text HOME to 741741
- **International Association for Suicide Prevention:** https://www.iasp.info/resources/Crisis_Centres/

## 💙 Made with Care

This application is designed to support mental wellness. Remember: you're not alone, and it's okay to ask for help.

---

**License:** MIT  
**Version:** 1.0.0  
**Last Updated:** 2025
