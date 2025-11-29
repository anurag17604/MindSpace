import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Smile, Meh, Frown, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const moodEmojis = [
  { emoji: '😊', label: 'Great', value: 5, color: '#10b981' },
  { emoji: '🙂', label: 'Good', value: 4, color: '#3b82f6' },
  { emoji: '😐', label: 'Okay', value: 3, color: '#f59e0b' },
  { emoji: '😔', label: 'Bad', value: 2, color: '#f97316' },
  { emoji: '😢', label: 'Terrible', value: 1, color: '#ef4444' },
];

export default function MoodTracker() {
  const [moods, setMoods] = useLocalStorage('mood-entries', []);
  const [selectedMood, setSelectedMood] = useState(null);
  const [notes, setNotes] = useState('');
  const [filterDays, setFilterDays] = useState(7);

  const handleSaveMood = () => {
    if (!selectedMood) {
      toast.error('Please select a mood');
      return;
    }

    const newMood = {
      id: Date.now(),
      mood: selectedMood,
      notes,
      date: new Date().toISOString(),
      dateStr: new Date().toLocaleDateString(),
      timeStr: new Date().toLocaleTimeString()
    };

    setMoods([...moods, newMood]);
    setSelectedMood(null);
    setNotes('');
    toast.success('Mood entry saved!');
  };

  const getFilteredMoods = () => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - filterDays);
    return moods.filter(m => new Date(m.date) >= cutoffDate);
  };

  const getMoodChartData = () => {
    return getFilteredMoods()
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(m => ({
        date: m.dateStr,
        mood: m.mood.value,
        label: m.mood.label
      }));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Mood Tracker
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Track your daily emotions and identify patterns to better understand your mental health.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mood Entry */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">How are you feeling today?</h2>
            
            <div className="grid grid-cols-5 gap-3 mb-6">
              {moodEmojis.map((mood) => (
                <button
                  key={mood.value}
                  data-testid={`mood-${mood.label.toLowerCase()}`}
                  onClick={() => setSelectedMood(mood)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${
                    selectedMood?.value === mood.value
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white scale-110 shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-700 hover:scale-105'
                  }`}
                >
                  <span className="text-3xl">{mood.emoji}</span>
                  <span className="text-xs font-medium">{mood.label}</span>
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Notes (Optional)
              </label>
              <Textarea
                data-testid="mood-notes-input"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What's on your mind? Any specific thoughts or events?"
                className="resize-none"
                rows={4}
              />
            </div>

            <Button
              data-testid="save-mood-button"
              onClick={handleSaveMood}
              className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Save Mood Entry
            </Button>
          </motion.div>

          {/* Mood Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Recent Entries</h2>
              <div className="flex gap-2">
                {[7, 30, 90].map((days) => (
                  <Button
                    key={days}
                    data-testid={`filter-${days}-days`}
                    size="sm"
                    variant={filterDays === days ? 'default' : 'outline'}
                    onClick={() => setFilterDays(days)}
                    className={`rounded-full text-xs ${
                      filterDays === days ? 'bg-gradient-to-r from-blue-500 to-purple-500' : ''
                    }`}
                  >
                    {days}d
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {getFilteredMoods().sort((a, b) => new Date(b.date) - new Date(a.date)).map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50"
                  data-testid={`mood-entry-${index}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{entry.mood.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {entry.mood.label}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {entry.timeStr}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{entry.dateStr}</p>
                      {entry.notes && (
                        <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">{entry.notes}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {getFilteredMoods().length === 0 && (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  No mood entries yet. Start tracking your mood!
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Mood Chart */}
        {getMoodChartData().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Mood Timeline</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getMoodChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.3} />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis domain={[0, 6]} ticks={[1, 2, 3, 4, 5]} stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  labelFormatter={(value) => `Date: ${value}`}
                  formatter={(value, name, props) => [props.payload.label, 'Mood']}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#8b5cf6" 
                  strokeWidth={3} 
                  dot={{ fill: '#8b5cf6', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
    </div>
  );
}
