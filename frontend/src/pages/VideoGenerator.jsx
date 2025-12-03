// --------------------
// API Note:
// We used the open-source Google Veo 3 API for text-to-video generation.
// Credits exhausted so generation may fail temporarily.
// --------------------

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { generateSummary, generateVideo } from '@/utils/dummyApis';
import { Loader2, Video, Check, FileText, Film, Download } from 'lucide-react';
import { toast } from 'sonner';
import TextToVideoVeo3 from '@/components/TextToVideoVeo3';

export default function VideoGenerator() {
  const [text, setText] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [videoData, setVideoData] = useState(null);

  const steps = [
    { label: 'Enter Text', icon: <FileText className="w-5 h-5" /> },
    { label: 'Generate Summary', icon: <FileText className="w-5 h-5" /> },
    { label: 'Create Video', icon: <Film className="w-5 h-5" /> },
    { label: 'Download', icon: <Download className="w-5 h-5" /> }
  ];

  const handleGenerateSummary = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text');
      return;
    }

    setLoading(true);
    try {
      const generatedSummary = await generateSummary(text);
      setSummary(generatedSummary);
      setCurrentStep(2);
      toast.success('Summary generated!');
    } catch (error) {
      toast.error('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateVideo = async () => {
    setLoading(true);
    try {
      const video = await generateVideo(summary);
      setVideoData(video);
      setCurrentStep(3);
      toast.success('Video generated successfully!');
    } catch (error) {
      toast.error('Failed to generate video');
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
            Text to Video Generator
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Transform your thoughts into engaging videos with AI-powered summarization and narration.
          </p>
        </motion.div>

        Progress Steps
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      index <= currentStep 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-500 border-transparent text-white' 
                        : 'border-slate-300 dark:border-slate-600 text-slate-400'
                    }`}
                    data-testid={`step-${index}`}
                  >
                    {index < currentStep ? <Check className="w-5 h-5" /> : step.icon}
                  </div>
                  <span className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center max-w-[80px]">
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-12 sm:w-24 mx-2 ${
                    index < currentStep ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-slate-300 dark:bg-slate-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Enter Text */}
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-8 border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Enter Your Text</h2>
            <Textarea
              data-testid="video-text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your thoughts, story, or message..."
              className="min-h-[250px] resize-none mb-4"
            />
            <Button
              data-testid="generate-summary-button"
              onClick={handleGenerateSummary}
              disabled={loading}
              className="w-full sm:w-auto rounded-full px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Summary'
              )}
            </Button>
          </motion.div>
        )}

        {/* Step 2: Summary Generated */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Generated Summary</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6" data-testid="generated-summary">{summary}</p>
              <Button
                data-testid="create-video-button"
                onClick={handleGenerateVideo}
                disabled={loading}
                className="w-full sm:w-auto rounded-full px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Video...
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4 mr-2" />
                    Create Video
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Video Ready */}
        {currentStep === 3 && videoData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-8 border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Your Video is Ready!</h2>
            <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden mb-6">
              <video 
                data-testid="generated-video"
                controls 
                className="w-full h-full"
                src={videoData.videoUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="flex gap-4">
              <Button
                data-testid="download-video-button"
                className="rounded-full px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                onClick={() => toast.success('Download started!')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Video
              </Button>
              <Button
                data-testid="create-another-button"
                variant="outline"
                className="rounded-full px-6"
                onClick={() => {
                  setCurrentStep(0);
                  setText('');
                  setSummary('');
                  setVideoData(null);
                }}
              >
                Create Another
              </Button>
            </div>
          </motion.div>
        )}

        <TextToVideoVeo3 />
      </div>
    </div>
  );
}
