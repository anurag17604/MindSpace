// --------------------
// Frontend-only chat to display sent messages
// --------------------

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Users } from 'lucide-react';
import { toast } from 'sonner';

const generateAnonymousName = () => {
  const adjectives = ['Happy', 'Calm', 'Brave', 'Kind', 'Wise', 'Gentle', 'Bright', 'Peaceful'];
  const nouns = ['Soul', 'Heart', 'Spirit', 'Friend', 'Helper', 'Listener', 'Mind', 'Warrior'];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}`;
};

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username] = useState(() => {
    const saved = localStorage.getItem('anonymous-username');
    if (saved) return saved;
    const generated = generateAnonymousName();
    localStorage.setItem('anonymous-username', generated);
    return generated;
  });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      text: newMessage,
      username,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    toast.success('Message sent!');
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            ANONYMOUS CHAT
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-4">
           Chat freely and anonymously with others in this safe space. Your identity is hidden, so feel free to express yourself!
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm">
            <Users className="w-4 h-4" />
            You're chatting as <span className="font-semibold">{username}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4" data-testid="chat-messages">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
                No messages yet. Be the first to say hello!
              </div>
            ) : (
              messages.map((message, index) => {
                const isOwnMessage = message.username === username;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                    data-testid={`chat-message-${index}`}
                  >
                    <div className={`max-w-[70%] ${
                      isOwnMessage 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                    } rounded-2xl px-4 py-3`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold opacity-80">
                          {message.username}
                        </span>
                        <span className="text-xs opacity-60">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm break-words">{message.text}</p>
                    </div>
                  </motion.div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex gap-2">
              <Input
                data-testid="chat-input"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button
                data-testid="send-message-button"
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="rounded-full px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400"
        >
          <p>Remember: Be kind, be supportive, and respect everyone's privacy.</p>
        </motion.div>
      </div>
    </div>
  );
}
