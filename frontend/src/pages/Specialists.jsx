import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, Phone, Mail, Star, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const specialists = [
  {
    id: 1,
    name: 'Dr. Sarah Mitchell',
    expertise: 'Anxiety & Depression',
    rating: 4.9,
    experience: '15+ years',
    availability: 'Available',
    price: '$120/session',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop'
  },
  {
    id: 2,
    name: 'Dr. James Chen',
    expertise: 'Trauma & PTSD',
    rating: 4.8,
    experience: '12+ years',
    availability: 'Available',
    price: '$150/session',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    expertise: 'Relationship Counseling',
    rating: 4.9,
    experience: '10+ years',
    availability: 'Limited',
    price: '$130/session',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop'
  },
  {
    id: 4,
    name: 'Dr. Michael Thompson',
    expertise: 'Stress & Burnout',
    rating: 4.7,
    experience: '8+ years',
    availability: 'Available',
    price: '$110/session',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop'
  },
  {
    id: 5,
    name: 'Dr. Lisa Park',
    expertise: 'Mindfulness & Meditation',
    rating: 5.0,
    experience: '20+ years',
    availability: 'Limited',
    price: '$140/session',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop'
  },
  {
    id: 6,
    name: 'Dr. Robert Williams',
    expertise: 'Addiction & Recovery',
    rating: 4.8,
    experience: '18+ years',
    availability: 'Available',
    price: '$160/session',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop'
  },
];

export default function Specialists() {
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Request sent! The specialist will contact you soon.');
    setFormData({ name: '', email: '', message: '' });
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
            Find Your Specialist
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Connect with qualified mental health professionals who can provide personalized support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialists.map((specialist, index) => (
            <motion.div
              key={specialist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all"
              data-testid={`specialist-card-${index}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={specialist.image}
                  alt={specialist.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                    {specialist.name}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                    {specialist.expertise}
                  </p>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-slate-900 dark:text-white">{specialist.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Experience:</span>
                  <span className="font-medium text-slate-900 dark:text-white">{specialist.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span>Availability:</span>
                  <span className={`font-medium ${
                    specialist.availability === 'Available' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-orange-600 dark:text-orange-400'
                  }`}>
                    {specialist.availability}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="font-medium text-slate-900 dark:text-white">{specialist.price}</span>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    data-testid={`contact-button-${index}`}
                    onClick={() => setSelectedSpecialist(specialist)}
                    className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Request Callback
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Request Callback from {selectedSpecialist?.name}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 block">
                        Your Name
                      </label>
                      <Input
                        data-testid="callback-name-input"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 block">
                        Email
                      </label>
                      <Input
                        data-testid="callback-email-input"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 block">
                        Message (Optional)
                      </label>
                      <Textarea
                        data-testid="callback-message-input"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your needs..."
                        className="resize-none"
                      />
                    </div>
                    <Button 
                      data-testid="submit-callback-button"
                      type="submit" 
                      className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Send Request
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
