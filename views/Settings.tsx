import React from 'react';
import { ChevronRight, Palette, Image as ImageIcon, Sparkles, LogOut, Crown } from 'lucide-react';
import { Theme } from '../types';
import { THEMES } from '../constants';

interface SettingsProps {
  currentThemeId: string;
  onThemeChange: (themeId: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({ currentThemeId, onThemeChange }) => {
  return (
    <div className="h-full overflow-y-auto no-scrollbar pt-10 px-6 pb-24">
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

      {/* Premium Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-5 mb-8 flex items-center justify-between shadow-lg shadow-purple-900/20">
        <div>
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <Crown size={20} className="text-yellow-300" />
            SoulFlow Premium
          </h3>
          <p className="text-purple-100 text-xs mt-1">Unlock all themes & detailed stats.</p>
        </div>
        <button className="bg-white text-purple-600 px-4 py-2 rounded-full text-xs font-bold shadow-md hover:scale-105 transition-transform">
          Upgrade
        </button>
      </div>

      <div className="space-y-6">
        {/* Appearance Section */}
        <section>
          <h2 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 ml-1">Appearance</h2>
          <div className="glass-panel rounded-3xl overflow-hidden">
            
            {/* Theme Color Item */}
            <div className="p-4 flex items-center justify-between border-b border-white/5 cursor-pointer hover:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-500/20 rounded-xl text-pink-400">
                  <Palette size={20} />
                </div>
                <span className="text-white font-medium">Theme Color</span>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
            </div>

            {/* Background Image Grid */}
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                 <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
                  <ImageIcon size={20} />
                </div>
                <span className="text-white font-medium">Background Image</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-2">
                {THEMES.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => onThemeChange(theme.id)}
                    className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${currentThemeId === theme.id ? 'border-white scale-95 shadow-lg' : 'border-transparent hover:scale-105'}`}
                  >
                    <img src={theme.bgImage} alt={theme.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-white shadow-black drop-shadow-md">{theme.name}</span>
                    </div>
                    {currentThemeId === theme.id && (
                       <div className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

             {/* Animation Settings */}
             <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-xl text-yellow-400">
                  <Sparkles size={20} />
                </div>
                <span className="text-white font-medium">Animation Effects</span>
              </div>
              <div className="w-10 h-6 bg-green-500 rounded-full relative">
                 <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>

          </div>
        </section>

        {/* Data Section */}
        <section>
          <h2 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 ml-1">Data & Account</h2>
          <div className="glass-panel rounded-3xl overflow-hidden">
             <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-xl text-red-400">
                  <LogOut size={20} />
                </div>
                <span className="text-white font-medium">Log Out</span>
              </div>
            </div>
          </div>
        </section>
        
        <p className="text-center text-gray-600 text-xs py-4">SoulFlow v1.0.0 (Build 204)</p>
      </div>
    </div>
  );
};