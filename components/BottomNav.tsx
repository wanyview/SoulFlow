import React from 'react';
import { Home, BarChart2, Settings, Box } from 'lucide-react';
import { View } from '../types';

interface BottomNavProps {
  currentView: View;
  onChangeView: (view: View) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { view: View.HOME, icon: Home, label: 'Home' },
    { view: View.JAR, icon: Box, label: 'Jar' },
    { view: View.STATS, icon: BarChart2, label: 'Stats' },
    { view: View.SETTINGS, icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
      <div className="glass-panel rounded-full px-6 py-4 flex justify-between items-center max-w-md mx-auto shadow-2xl">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          const Icon = item.icon;
          return (
            <button
              key={item.view}
              onClick={() => onChangeView(item.view)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? 'text-white scale-110' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </button>
          );
        })}
      </div>
    </div>
  );
};