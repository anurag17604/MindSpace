import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Plus, Trash2, Check, Flame } from 'lucide-react';
import { toast } from 'sonner';

export default function HabitTracker() {
  const [habits, setHabits] = useLocalStorage('habits', []);
  const [newHabitName, setNewHabitName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addHabit = () => {
    if (!newHabitName.trim()) {
      toast.error('Please enter a habit name');
      return;
    }

    const newHabit = {
      id: Date.now(),
      name: newHabitName,
      createdAt: new Date().toISOString(),
      completions: []
    };

    setHabits([...habits, newHabit]);
    setNewHabitName('');
    setIsDialogOpen(false);
    toast.success('Habit added!');
  };

  const deleteHabit = (habitId) => {
    setHabits(habits.filter(h => h.id !== habitId));
    toast.success('Habit deleted');
  };

  const toggleHabitCompletion = (habitId) => {
    const today = new Date().toDateString();
    
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const completions = habit.completions || [];
        const todayIndex = completions.indexOf(today);
        
        if (todayIndex > -1) {
          return {
            ...habit,
            completions: completions.filter((_, i) => i !== todayIndex)
          };
        } else {
          return {
            ...habit,
            completions: [...completions, today]
          };
        }
      }
      return habit;
    }));
  };

  const isCompletedToday = (habit) => {
    const today = new Date().toDateString();
    return (habit.completions || []).includes(today);
  };

  const getStreak = (habit) => {
    const completions = (habit.completions || []).map(d => new Date(d)).sort((a, b) => b - a);
    if (completions.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < completions.length; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      checkDate.setHours(0, 0, 0, 0);

      const completionDate = new Date(completions[i]);
      completionDate.setHours(0, 0, 0, 0);

      if (completionDate.getTime() === checkDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const getCompletionRate = (habit) => {
    const daysSinceCreated = Math.floor(
      (new Date() - new Date(habit.createdAt)) / (1000 * 60 * 60 * 24)
    ) + 1;
    const completions = (habit.completions || []).length;
    return Math.round((completions / daysSinceCreated) * 100);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Habit Tracker
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Build positive habits and track your daily progress with streak counters.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-center"
        >
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                data-testid="add-habit-button"
                className="rounded-full px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Habit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Habit</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  data-testid="habit-name-input"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  placeholder="e.g., Morning meditation"
                  onKeyDown={(e) => e.key === 'Enter' && addHabit()}
                />
                <Button 
                  data-testid="save-habit-button"
                  onClick={addHabit} 
                  className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  Add Habit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {habits.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-4">No habits yet. Start building healthy routines!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {habits.map((habit, index) => {
              const streak = getStreak(habit);
              const completionRate = getCompletionRate(habit);
              const isCompleted = isCompletedToday(habit);

              return (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border-2 transition-all ${
                    isCompleted 
                      ? 'border-green-400 dark:border-green-500' 
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                  data-testid={`habit-card-${index}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        {habit.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                          <Flame className="w-4 h-4" />
                          <span className="font-semibold">{streak}</span>
                          <span className="text-slate-600 dark:text-slate-400">day streak</span>
                        </div>
                        <div className="text-slate-600 dark:text-slate-400">
                          {completionRate}% complete
                        </div>
                      </div>
                    </div>
                    <button
                      data-testid={`delete-habit-${index}`}
                      onClick={() => deleteHabit(habit.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <Button
                    data-testid={`toggle-habit-${index}`}
                    onClick={() => toggleHabitCompletion(habit.id)}
                    className={`w-full rounded-full ${
                      isCompleted
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Completed Today
                      </>
                    ) : (
                      'Mark as Done'
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
