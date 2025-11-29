import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { generateSummary, analyzeSentiment, extractKeyPoints } from '@/utils/dummyApis';
import { Loader2, FileText, TrendingUp, List } from 'lucide-react';
import { toast } from 'sonner';

export default function TextSummary() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    try {
      const [summary, sentiment, keyPoints] = await Promise.all([
        generateSummary(text),
        analyzeSentiment(text),
        extractKeyPoints(text)
      ]);

      setResults({ summary, sentiment, keyPoints });
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error('Failed to analyze text');
    } finally {
      setLoading(false);
    }
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
            Text Summary & Analysis
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Paste your thoughts or journal entry below for an AI-powered summary, sentiment analysis, and key points extraction.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-8 border border-slate-200 dark:border-slate-700 mb-8"
        >
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Your Text
          </label>
          <Textarea
            data-testid="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write or paste your thoughts here... Share what's on your mind, and we'll help you understand it better."
            className="min-h-[200px] resize-none"
          />
          <Button
            data-testid="analyze-button"
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-4 w-full sm:w-auto rounded-full px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Text'
            )}
          </Button>
        </motion.div>

        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Summary */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700" data-testid="summary-section">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Summary</h2>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{results.summary}</p>
            </div>

            {/* Sentiment */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700" data-testid="sentiment-section">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Sentiment Analysis</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-600 dark:text-green-400">Positive</span>
                    <span className="font-medium">{results.sentiment.positive}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${results.sentiment.positive}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-600 dark:text-red-400">Negative</span>
                    <span className="font-medium">{results.sentiment.negative}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded-full transition-all duration-500"
                      style={{ width: `${results.sentiment.negative}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Neutral</span>
                    <span className="font-medium">{results.sentiment.neutral}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-500 rounded-full transition-all duration-500"
                      style={{ width: `${results.sentiment.neutral}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Key Points */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700" data-testid="keypoints-section">
              <div className="flex items-center gap-2 mb-4">
                <List className="w-5 h-5 text-teal-500" />
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Key Points</h2>
              </div>
              <ul className="space-y-3">
                {results.keyPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 text-white text-xs flex items-center justify-center font-medium">
                      {index + 1}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 flex-1">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
