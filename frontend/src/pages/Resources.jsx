import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, Video, FileText, ExternalLink } from 'lucide-react';

const resources = [
  {
    id: 1,
    title: 'Understanding Anxiety',
    category: 'Articles',
    description: 'A comprehensive guide to understanding and managing anxiety disorders.',
    url: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
    type: 'article'
  },
  {
    id: 2,
    title: 'Depression: Symptoms and Treatment',
    category: 'Articles',
    description: 'Learn about depression symptoms, causes, and effective treatment options.',
    url: 'https://www.nimh.nih.gov/health/topics/depression',
    type: 'article'
  },
  {
    id: 3,
    title: 'Mindfulness Meditation Guide',
    category: 'Videos',
    description: 'A beginner-friendly introduction to mindfulness meditation practices.',
    url: 'https://www.headspace.com/meditation',
    type: 'video'
  },
  {
    id: 4,
    title: 'Stress Management Techniques',
    category: 'Guides',
    description: 'Practical techniques to reduce stress and improve well-being.',
    url: 'https://www.apa.org/topics/stress',
    type: 'guide'
  },
  {
    id: 5,
    title: 'Sleep Hygiene Basics',
    category: 'Articles',
    description: 'Essential tips for better sleep quality and establishing healthy sleep habits.',
    url: 'https://www.sleepfoundation.org/sleep-hygiene',
    type: 'article'
  },
  {
    id: 6,
    title: 'Cognitive Behavioral Therapy (CBT)',
    category: 'Guides',
    description: 'An introduction to CBT and how it can help with mental health challenges.',
    url: 'https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral',
    type: 'guide'
  },
  {
    id: 7,
    title: 'Breathing Exercises for Calm',
    category: 'Videos',
    description: 'Simple breathing techniques to reduce anxiety and promote relaxation.',
    url: 'https://www.healthline.com/health/breathing-exercises-for-anxiety',
    type: 'video'
  },
  {
    id: 8,
    title: 'Building Resilience',
    category: 'Articles',
    description: 'Strategies to develop emotional resilience and cope with life\'s challenges.',
    url: 'https://www.apa.org/topics/resilience',
    type: 'article'
  },
];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Articles', 'Videos', 'Guides'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'article': return <FileText className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'guide': return <BookOpen className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Mental Health Resources
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Curated collection of articles, videos, and guides to support your mental wellness journey.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              data-testid="search-input"
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex justify-center gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                data-testid={`category-${category.toLowerCase()}`}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                    : ''
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all group"
              data-testid={`resource-card-${index}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  {getIcon(resource.type)}
                </div>
                <div className="flex-1">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1 block">
                    {resource.category}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                    {resource.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {resource.description}
              </p>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`resource-link-${index}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Learn More
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </motion.div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">No resources found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
