// Dummy API functions for text processing and video generation

export const generateSummary = async (text) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  const summaryLength = Math.max(1, Math.floor(sentences.length / 3));
  return sentences.slice(0, summaryLength).join('. ') + '.';
};

export const analyzeSentiment = async (text) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const positiveWords = ['happy', 'joy', 'love', 'great', 'wonderful', 'excellent', 'good', 'better', 'best', 'amazing'];
  const negativeWords = ['sad', 'angry', 'hate', 'terrible', 'awful', 'bad', 'worse', 'worst', 'depressed', 'anxious'];
  
  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
    if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
  });
  
  const total = positiveCount + negativeCount || 1;
  const sentiment = {
    positive: Math.round((positiveCount / total) * 100),
    negative: Math.round((negativeCount / total) * 100),
    neutral: Math.round(((total - positiveCount - negativeCount) / total) * 100)
  };
  
  return sentiment;
};

export const extractKeyPoints = async (text) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  return sentences.slice(0, 5).map((s, i) => `Point ${i + 1}: ${s.trim()}`);
};

export const generateVideo = async (summary) => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Return a placeholder video URL
  return {
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    audioUrl: 'placeholder-audio.mp3',
    duration: '30s'
  };
};
