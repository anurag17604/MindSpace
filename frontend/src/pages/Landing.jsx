import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  MessageCircle, 
  FileText, 
  Video, 
  Smile, 
  BookOpen, 
  Users, 
  Calendar,
  ListChecks,
  Sparkles,
  Heart,
  Shield
} from 'lucide-react';

export default function Landing() {
  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Text Summary',
      description: 'Get concise summaries of your thoughts with sentiment analysis and key points extraction.',
      link: '/summary'
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: 'Video Generator',
      description: 'Transform your text summaries into engaging videos with AI-powered narration.',
      link: '/video'
    },
    {
      icon: <Smile className="w-8 h-8" />,
      title: 'Face Emotion Tracker',
      description: 'Real-time emotion detection using your webcam to understand your emotional state.',
      link: '/emotion'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Mental Health Resources',
      description: 'Curated collection of articles, guides, and tools for mental wellness.',
      link: '/resources'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Find Specialists',
      description: 'Connect with qualified mental health professionals who can help you.',
      link: '/specialists'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Mood Tracker',
      description: 'Track your daily moods and emotions with beautiful visual charts.',
      link: '/mood'
    },
    {
      icon: <ListChecks className="w-8 h-8" />,
      title: 'Habit Tracker',
      description: 'Build positive habits with daily tracking and streak counters.',
      link: '/habits'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Anonymous Chat',
      description: 'Connect with others in a safe, anonymous community chat room.',
      link: '/chat'
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      text: 'ZenMentor has been a lifeline for me. The mood tracker helps me identify patterns I never noticed before.',
      role: 'User since 2024'
    },
    {
      name: 'James T.',
      text: 'The anonymous chat feature is amazing. I feel comfortable sharing without judgment.',
      role: 'Community Member'
    },
    {
      name: 'Emily R.',
      text: 'Finally, a mental health app that feels warm and supportive, not clinical.',
      role: 'Daily User'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Your Mental Wellness Journey Starts Here
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Your Safe Space for
            <span className="block mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
              Mental Wellness
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            A comprehensive platform designed to support your mental health journey with AI-powered tools, tracking features, and a caring community.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              data-testid="get-started-button"
              className="rounded-full px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            >
              <Link to="/mood">Start Now</Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline"
              data-testid="track-emotions-button"
              className="rounded-full px-8 border-2"
            >
              <Link to="/emotion">Track Emotions</Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline"
              data-testid="text-summary-button"
              className="rounded-full px-8 border-2"
            >
              <Link to="/summary">Text Summary</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Everything You Need for Mental Wellness
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you understand, track, and improve your mental health.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to={feature.link} data-testid={`feature-card-${index}`}>
                  <div className="group h-full p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              What Our Community Says
            </h2>
            <p className="text-slate-600 dark:text-slate-300">Real stories from real people</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200 dark:border-slate-700"
                data-testid={`testimonial-${index}`}
              >
                <p className="text-slate-700 dark:text-slate-300 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-500 to-purple-500">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <Heart className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Join thousands of people taking control of their mental health.
          </p>
          <Button 
            asChild
            size="lg" 
            data-testid="start-journey-button"
            className="rounded-full px-8 bg-white text-blue-600 hover:bg-slate-100"
          >
            <Link to="/mood">Begin Your Journey</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
