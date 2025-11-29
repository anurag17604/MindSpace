import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Landing from '@/pages/Landing';
import TextSummary from '@/pages/TextSummary';
import VideoGenerator from '@/pages/VideoGenerator';
import FaceEmotion from '@/pages/FaceEmotion';
import Resources from '@/pages/Resources';
import Specialists from '@/pages/Specialists';
import MoodTracker from '@/pages/MoodTracker';
import HabitTracker from '@/pages/HabitTracker';
import Chat from '@/pages/Chat';
import '@/App.css';

function App() {
  return (
    <div className="App min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <BrowserRouter>
        <Navbar />
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/summary" element={<TextSummary />} />
          <Route path="/video" element={<VideoGenerator />} />
          <Route path="/emotion" element={<FaceEmotion />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/specialists" element={<Specialists />} />
          <Route path="/mood" element={<MoodTracker />} />
          <Route path="/habits" element={<HabitTracker />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
