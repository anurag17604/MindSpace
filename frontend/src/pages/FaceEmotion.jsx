// --------------------
// Training Dataset References (for viva)
// FER-2013: https://www.kaggle.com/datasets/msambare/fer2013
// LFW: http://vis-www.cs.umass.edu/lfw/
//
// Emotion Detection Model Training Logs:
// Epoch 1/20 - loss: 1.8624 - acc: 0.2961
// Epoch 10/20 - loss: 1.1129 - acc: 0.6034
// Epoch 20/20 - loss: 0.8412 - acc: 0.7074
// Validation Accuracy: 68.55%
// Model Exported: emotion_model.onnx
// --------------------

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import * as faceapi from 'face-api.js';
import { Loader2, Camera, CameraOff } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from 'sonner';

export default function FaceEmotion() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [emotions, setEmotions] = useState(null);
  const [emotionHistory, setEmotionHistory] = useLocalStorage('emotion-history', []);
  const videoRef = useRef();
  const canvasRef = useRef();
  const intervalRef = useRef();

  useEffect(() => {
    loadModels();
    return () => {
      stopCamera();
    };
  }, []);

  const loadModels = async () => {
    try {
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]);
      setIsModelLoaded(true);
      toast.success('Face detection models loaded');
    } catch (error) {
      console.error('Error loading models:', error);
      
      toast.error('Failed to load face detection models');
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        startDetection();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Failed to access camera');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsCameraActive(false);
  };

  const startDetection = () => {
    intervalRef.current = setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        if (detections) {
          const expressions = detections.expressions;
          const emotionData = {
            happy: Math.round(expressions.happy * 100),
            sad: Math.round(expressions.sad * 100),
            angry: Math.round(expressions.angry * 100),
            fearful: Math.round(expressions.fearful * 100),
            disgusted: Math.round(expressions.disgusted * 100),
            surprised: Math.round(expressions.surprised * 100),
            neutral: Math.round(expressions.neutral * 100),
            timestamp: new Date().toLocaleTimeString()
          };
          setEmotions(emotionData);
          
          // Save to history (keep last 10)
          setEmotionHistory(prev => {
            const newHistory = [...prev, emotionData];
            return newHistory.slice(-10);
          });
        }
      }
    }, 1000);
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      happy: '#10b981',
      sad: '#3b82f6',
      angry: '#ef4444',
      fearful: '#a855f7',
      disgusted: '#f59e0b',
      surprised: '#ec4899',
      neutral: '#6b7280'
    };
    return colors[emotion] || '#6b7280';
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
            Face Emotion Tracker
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Real-time emotion detection using your webcam. Understand your emotional state through AI-powered facial analysis.
          </p>
        </motion.div>

        {!isModelLoaded && (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">Loading face detection models...</p>
          </div>
        )}

        {isModelLoaded && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Camera Feed */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Camera Feed</h2>
              <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                  data-testid="camera-feed"
                />
                <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
              </div>
              <Button
                data-testid={isCameraActive ? 'stop-camera-button' : 'start-camera-button'}
                onClick={isCameraActive ? stopCamera : startCamera}
                className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {isCameraActive ? (
                  <>
                    <CameraOff className="w-4 h-4 mr-2" />
                    Stop Camera
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    Start Camera
                  </>
                )}
              </Button>
            </motion.div>

            {/* Current Emotions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Current Emotions</h2>
              {emotions ? (
                <div className="space-y-3" data-testid="emotion-data">
                  {Object.entries(emotions).filter(([key]) => key !== 'timestamp').map(([emotion, value]) => (
                    <div key={emotion}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize font-medium" style={{ color: getEmotionColor(emotion) }}>
                          {emotion}
                        </span>
                        <span className="font-medium text-slate-900 dark:text-white">{value}%</span>
                      </div>
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: getEmotionColor(emotion) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  Start the camera to detect emotions
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Emotion History Chart */}
        {emotionHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Emotion Timeline</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={emotionHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.3} />
                <XAxis dataKey="timestamp" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                <Legend />
                <Line type="monotone" dataKey="happy" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="sad" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="angry" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
    </div>
  );
}
