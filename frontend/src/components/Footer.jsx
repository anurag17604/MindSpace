import React from 'react';
import { Heart, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-blue-500" />
              <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                ZenMentor
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Your safe space for mental wellness. We're here to support your journey to better mental health.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="/resources" className="hover:text-blue-500 transition-colors">Resources</a></li>
              <li><a href="/specialists" className="hover:text-blue-500 transition-colors">Find a Specialist</a></li>
              <li><a href="/chat" className="hover:text-blue-500 transition-colors">Anonymous Chat</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@zenmentor.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                1-800-ZENMENT
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} ZenMentor. All rights reserved. Made with care for your mental wellness.</p>
        </div>
      </div>
    </footer>
  );
};
