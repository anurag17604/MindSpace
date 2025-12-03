import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const TextToVideoVeo3 = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            toast.error('Please enter a prompt');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('/api/veo3/generate', { prompt });
            if (response.data.success) {
                setVideoUrl(response.data.video_url);
                toast.success('Video generated successfully!');
            } else {
                toast.error(response.data.error || 'Failed to generate video');
            }
        } catch (error) {
            toast.error('Error generating video');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-8 border border-slate-200 dark:border-slate-700 mt-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Text to Video with VEO 3</h2>
            <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt for video generation..."
                className="min-h-[100px] resize-none mb-4"
            />
            <Button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full sm:w-auto rounded-full px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating video...
                    </>
                ) : (
                    'Generate with Veo 3'
                )}
            </Button>
            {videoUrl && (
                <div className="mt-6">
                    <video controls className="w-full max-w-md">
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    );
};

export default TextToVideoVeo3;