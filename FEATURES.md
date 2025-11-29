# ZenMentor - Complete Feature Documentation

## 🎯 Overview

ZenMentor is a comprehensive mental health support platform featuring 9 core modules designed to help users track, understand, and improve their mental wellness.

---

## 🏠 Feature 1: Landing Page

### Description
Modern, welcoming landing page that introduces the platform and its features.

### Components
- **Hero Section**
  - Motivational headline: "Your Safe Space for Mental Wellness"
  - Sub-headline with platform description
  - Three prominent CTA buttons (Start Now, Track Emotions, Text Summary)
  - Gradient background with calming colors

- **Features Grid**
  - 8 feature cards with icons
  - Hover animations and glassmorphism effects
  - Direct links to each feature
  - Brief description of each module

- **Testimonials Section**
  - 3 user testimonials
  - Professional layout with user names and roles
  - Animated entrance on scroll

- **Final CTA Section**
  - Gradient background
  - Heart icon
  - "Begin Your Journey" call-to-action

### Technical Details
- **Animation:** Framer Motion for smooth transitions
- **Styling:** Tailwind CSS with custom gradients
- **Typography:** Playfair Display for headings, Inter for body
- **Responsive:** Mobile-first design

### User Journey
1. User lands on page
2. Reads about platform features
3. Chooses a feature to explore
4. Navigates to specific module

---

## 📝 Feature 2: Text Summary & Analysis

### Description
AI-powered text analysis tool that provides summaries, sentiment analysis, and key points extraction.

### Capabilities
1. **Text Summarization**
   - Reduces text to 1/3 of original length
   - Maintains key information
   - Uses dummy API (can be replaced with real AI)

2. **Sentiment Analysis**
   - Analyzes positive, negative, and neutral sentiment
   - Shows percentage breakdown
   - Visual progress bars with color coding
   - Green (positive), Red (negative), Gray (neutral)

3. **Key Points Extraction**
   - Extracts up to 5 main points
   - Numbered list format
   - Animated entrance

### User Flow
1. Enter or paste text in textarea
2. Click "Analyze Text" button
3. View loading animation
4. Results appear in three sections:
   - Summary card
   - Sentiment breakdown
   - Key points list

### Technical Implementation
- **API Functions:** `generateSummary()`, `analyzeSentiment()`, `extractKeyPoints()`
- **Location:** `/app/frontend/src/utils/dummyApis.js`
- **State Management:** React useState for results
- **Notifications:** Sonner toast notifications

### Customization Points
Replace dummy APIs with:
- OpenAI GPT for summarization
- Sentiment analysis APIs (AWS Comprehend, Azure Text Analytics)
- Custom ML models

---

## 🎬 Feature 3: Text to Video Generator

### Description
Multi-step video generation system that converts text into videos with narration.

### Workflow
1. **Step 1: Text Input**
   - User enters text content
   - Textarea with 250px minimum height

2. **Step 2: Summary Generation**
   - Automatically summarizes input text
   - Shows generated summary
   - "Create Video" button

3. **Step 3: Video Creation**
   - Simulates video generation (3s delay)
   - Progress indicator

4. **Step 4: Video Ready**
   - Displays video player
   - Download button
   - "Create Another" option

### Progress Steps UI
- 4 circular step indicators
- Connected by progress lines
- Color changes: Gray → Blue/Purple gradient
- Checkmark on completed steps

### Video Output
- Placeholder video (BigBuckBunny sample)
- Aspect ratio: 16:9
- HTML5 video player with controls

### Technical Notes
- **Dummy API:** `generateVideo()`
- **Video Source:** Sample MP4 from Google Cloud Storage
- **Real Implementation:** Could use:
  - D-ID for AI avatars
  - Synthesia for video generation
  - ElevenLabs for voice synthesis

---

## 😊 Feature 4: Face Emotion Tracker

### Description
Real-time facial emotion detection using webcam and face-api.js library.

### Detected Emotions
1. Happy (Green)
2. Sad (Blue)
3. Angry (Red)
4. Fearful (Purple)
5. Disgusted (Orange)
6. Surprised (Pink)
7. Neutral (Gray)

### Features
- **Live Webcam Feed**
  - Video element with camera stream
  - Canvas overlay for detection visualization
  - Start/Stop camera controls

- **Real-Time Detection**
  - Updates every 1 second
  - Percentage display for each emotion
  - Animated progress bars

- **Emotion History**
  - Saves last 10 readings
  - Stored in LocalStorage
  - Timeline chart using Recharts
  - Shows Happy, Sad, Angry trends over time

### Technical Requirements
- **Models:** face-api.js TinyFaceDetector + FaceExpressionNet
- **Location:** `/app/frontend/public/models/`
- **Browser Permissions:** Webcam access required
- **Performance:** Runs client-side, no server needed

### Security & Privacy
- All processing happens in browser
- No images sent to server
- No data leaves user's device
- LocalStorage data stays on device

### Model Files Required
```
public/models/
├── tiny_face_detector_model-weights_manifest.json
├── tiny_face_detector_model-shard1
├── face_expression_model-weights_manifest.json
└── face_expression_model-shard1
```

---

## 📚 Feature 5: Mental Health Resources

### Description
Curated library of mental health resources with search and filtering.

### Resource Types
1. **Articles** - Written guides and information
2. **Videos** - Educational video content
3. **Guides** - Step-by-step resources

### Sample Resources (8 included)
1. Understanding Anxiety (NIMH)
2. Depression: Symptoms and Treatment (NIMH)
3. Mindfulness Meditation Guide (Headspace)
4. Stress Management Techniques (APA)
5. Sleep Hygiene Basics (Sleep Foundation)
6. Cognitive Behavioral Therapy (APA)
7. Breathing Exercises for Calm (Healthline)
8. Building Resilience (APA)

### Features
- **Search Bar**
  - Searches titles and descriptions
  - Real-time filtering
  - Case-insensitive

- **Category Filter**
  - All / Articles / Videos / Guides
  - Pill-style buttons
  - Active state highlighting

- **Resource Cards**
  - Icon based on type
  - Title and description
  - External link to source
  - Hover animations

### Customization
Add more resources by updating the `resources` array in `/app/frontend/src/pages/Resources.jsx`:

```javascript
{
  id: 9,
  title: 'Your Resource Title',
  category: 'Articles',
  description: 'Description here',
  url: 'https://example.com',
  type: 'article'
}
```

---

## 👨‍⚕️ Feature 6: Specialist Contact Directory

### Description
Directory of mental health professionals with contact request system.

### Specialist Information
Each specialist card shows:
- Profile photo
- Name and credentials
- Area of expertise
- Rating (out of 5.0)
- Years of experience
- Availability status
- Price per session

### Sample Specialists (6 included)
1. Dr. Sarah Mitchell - Anxiety & Depression
2. Dr. James Chen - Trauma & PTSD
3. Dr. Emily Rodriguez - Relationship Counseling
4. Dr. Michael Thompson - Stress & Burnout
5. Dr. Lisa Park - Mindfulness & Meditation
6. Dr. Robert Williams - Addiction & Recovery

### Request Callback Feature
- Modal dialog form
- Fields:
  - Your Name (required)
  - Email (required)
  - Message (optional)
- Submit button triggers success toast
- No backend required (demo mode)

### Real Implementation Suggestions
- Integrate with calendar API (Calendly, Cal.com)
- Email notification system
- CRM integration
- Video consultation booking

---

## 📊 Feature 7: Mood Tracker

### Description
Daily mood logging system with visual charts and historical data.

### Mood Options (5 levels)
1. 😊 Great (5) - Green
2. 🙂 Good (4) - Blue
3. 😐 Okay (3) - Orange
4. 😔 Bad (2) - Dark Orange
5. 😢 Terrible (1) - Red

### Features
- **Mood Selection**
  - Large emoji buttons
  - Visual feedback on selection
  - Gradient highlight for selected mood

- **Notes Field**
  - Optional text input
  - Helps identify triggers and patterns
  - Saved with mood entry

- **Recent Entries Timeline**
  - Reverse chronological order
  - Date and time stamps
  - Displays notes if provided
  - Scrollable list

- **Date Filters**
  - 7 days (default)
  - 30 days
  - 90 days

- **Mood Timeline Chart**
  - Line chart using Recharts
  - X-axis: Dates
  - Y-axis: Mood value (1-5)
  - Shows mood trends over time

### Data Storage
- **Method:** LocalStorage
- **Key:** `mood-entries`
- **Format:** JSON array
- **Persistence:** Survives browser refresh
- **Privacy:** Data stays on device

### Data Structure
```javascript
{
  id: 1234567890,
  mood: { emoji: '😊', label: 'Great', value: 5, color: '#10b981' },
  notes: 'Had a great day at work!',
  date: '2025-01-15T10:30:00.000Z',
  dateStr: '1/15/2025',
  timeStr: '10:30 AM'
}
```

---

## ✅ Feature 8: Habit Tracker

### Description
Daily habit tracking system with streaks and completion rates.

### Core Features
- **Add Custom Habits**
  - Dialog modal for adding habits
  - Simple name input
  - Instant creation

- **Habit Cards**
  - Habit name
  - Current streak (🔥 flame icon)
  - Completion rate percentage
  - Mark as done button
  - Delete option

- **Streak Calculation**
  - Counts consecutive days
  - Resets if day missed
  - Orange flame icon
  - Motivates consistency

- **Completion Rate**
  - Formula: (completions / days since created) × 100
  - Shows overall progress
  - Updates with each completion

- **Daily Tracking**
  - One completion per day
  - Toggle on/off
  - Green checkmark when done
  - Resets midnight

### Visual States
- **Incomplete Habit:**
  - Gray border
  - Blue/Purple gradient button
  - "Mark as Done" text

- **Completed Habit:**
  - Green border (highlighted)
  - Green button
  - "Completed Today" text with checkmark

### Data Storage
- **Method:** LocalStorage
- **Key:** `habits`
- **Format:** JSON array

### Data Structure
```javascript
{
  id: 1234567890,
  name: 'Morning meditation',
  createdAt: '2025-01-01T08:00:00.000Z',
  completions: [
    'Mon Jan 13 2025',
    'Tue Jan 14 2025',
    'Wed Jan 15 2025'
  ]
}
```

### Usage Suggestions
Perfect for tracking:
- Exercise routines
- Meditation practice
- Journaling
- Sleep schedule
- Healthy eating
- Social connection
- Screen time limits

---

## 💬 Feature 9: Anonymous Chat

### Description
Real-time community chat room with anonymous usernames and Firebase backend.

### Key Features
- **Anonymous Usernames**
  - Auto-generated on first visit
  - Format: Adjective + Noun (e.g., "HappySoul", "CalmHeart")
  - Saved in localStorage
  - Persistent across sessions

- **Real-Time Messaging**
  - Firebase Realtime Database
  - Instant message delivery
  - Message timestamps
  - Scrollable chat history

- **Message Bubbles**
  - Own messages: Right-aligned, blue/purple gradient
  - Others: Left-aligned, gray background
  - Username and timestamp shown
  - Rounded corners (2xl)

- **Chat Interface**
  - Input field at bottom
  - Send button (disabled when empty)
  - Auto-scroll to latest message
  - Connection status indicator

### User Experience
1. User visits chat page
2. Sees their anonymous username in badge
3. Types message in input field
4. Presses Enter or clicks Send
5. Message appears instantly
6. Other users' messages appear in real-time

### Firebase Setup Required
Update `/app/frontend/src/firebase/config.js`:

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

### Database Structure
```
chat/
  ├── message-id-1/
  │   ├── text: "Hello everyone!"
  │   ├── username: "HappySoul"
  │   └── timestamp: 1705320000000
  ├── message-id-2/
  │   ├── text: "Welcome!"
  │   ├── username: "CalmHeart"
  │   └── timestamp: 1705320060000
```

### Safety Features
- Anonymous (no personal info)
- Moderation guidelines shown
- No private messaging (community only)
- Encourages supportive conversation

### Production Considerations
For real deployment, add:
- Profanity filter
- Message reporting
- Rate limiting
- Moderator roles
- Message deletion (admin)
- Ban system

---

## 🎨 Global Features

### Theme Toggle (Light/Dark Mode)
- **Location:** Navbar
- **Icon:** Moon/Sun
- **Storage:** localStorage
- **Implementation:** CSS class toggle on `<html>` element
- **Scope:** Affects all pages

### Navigation
- **Fixed navbar** at top
- Logo + app name
- All 9 feature links
- Responsive (hidden on mobile < lg)
- Smooth transitions

### Footer
- Company info
- Quick links
- Contact information
- Copyright notice

### Animations
- **Library:** Framer Motion
- **Types:**
  - Page entrance (fade + slide up)
  - Staggered children
  - Hover effects
  - Progress animations
  - Scroll-triggered

### Notifications
- **Library:** Sonner
- **Position:** Top center
- **Types:** Success, Error, Info
- **Auto-dismiss:** 3-5 seconds

### Responsive Design
- **Breakpoints:**
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- **Mobile-first approach**
- Flexible grids
- Collapsible navigation

---

## 📦 LocalStorage Features

### Stored Data
1. **theme** - Light/Dark mode preference
2. **anonymous-username** - Chat username
3. **mood-entries** - Mood tracker history
4. **habits** - Habit tracker data
5. **emotion-history** - Face emotion readings

### Privacy Note
All LocalStorage data remains on user's device and is never transmitted to servers.

---

## 🔌 API Integration Points

### Ready for Real APIs
Replace dummy functions in `/app/frontend/src/utils/dummyApis.js`:

1. **Text Summarization**
   - OpenAI GPT-4
   - Anthropic Claude
   - Cohere Summarize

2. **Sentiment Analysis**
   - AWS Comprehend
   - Google Cloud Natural Language
   - Azure Text Analytics

3. **Video Generation**
   - Synthesia
   - D-ID
   - Pictory

4. **Voice Synthesis**
   - ElevenLabs
   - Google Text-to-Speech
   - Amazon Polly

---

## 🎯 User Flows

### First-Time User
1. Lands on homepage
2. Reads about features
3. Explores Mood Tracker
4. Logs first mood
5. Checks Habit Tracker
6. Creates first habit
7. Browses Resources
8. Visits Chat (anonymous)

### Returning User
1. Directly navigates to Mood Tracker
2. Logs daily mood
3. Checks habit progress
4. Marks habits complete
5. Reviews mood trends in chart
6. Chats with community

---

## 📊 Analytics Opportunities

Track these metrics for insights:
- Daily active users
- Most used features
- Average session duration
- Mood trends (aggregated)
- Habit completion rates
- Chat activity
- Resource page views

---

## ♿ Accessibility Features

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Focus indicators
- High contrast mode support
- Screen reader friendly
- Proper heading hierarchy

---

## 🚀 Performance

- Code splitting (React.lazy)
- Optimized images
- Minimal dependencies
- LocalStorage for offline features
- Efficient re-renders
- Debounced search inputs

---

**End of Feature Documentation**

For deployment instructions, see [DEPLOYMENT.md](/app/DEPLOYMENT.md)  
For technical setup, see [README.md](/app/README.md)
