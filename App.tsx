import React, { useState, useEffect } from 'react';
import { subDays } from 'date-fns';
import { View, MoodEntry, MoodType } from './types';
import { THEMES } from './constants';
import { Home } from './views/Home';
import { Jar } from './views/Jar';
import { Statistics } from './views/Statistics';
import { Settings } from './views/Settings';
import { BottomNav } from './components/BottomNav';

// Mock Data Generation
const generateMockData = (): MoodEntry[] => {
  const data: MoodEntry[] = [];
  const today = new Date();
  
  // Create ~20 days of data
  for (let i = 0; i < 20; i++) {
    if (Math.random() > 0.8) continue; // Skip some days
    const date = subDays(today, i);
    const moods = Object.values(MoodType);
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    
    data.push({
      id: Math.random().toString(36).substr(2, 9),
      date: date,
      mood: randomMood,
      note: 'Auto-generated note',
    });
  }
  return data;
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [themeId, setThemeId] = useState<string>(THEMES[0].id);

  useEffect(() => {
    // Initial data load
    setEntries(generateMockData());
  }, []);

  const handleAddEntry = (mood: MoodType, note: string) => {
    const newEntry: MoodEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date(),
      mood,
      note,
    };
    // Remove existing entry for today if exists (simple logic for now)
    const filtered = entries.filter(e => e.date.toDateString() !== new Date().toDateString());
    setEntries([newEntry, ...filtered]);
  };

  const activeTheme = THEMES.find(t => t.id === themeId) || THEMES[0];

  return (
    <div className="relative w-full h-screen overflow-hidden flex justify-center bg-black">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out opacity-60"
        style={{ backgroundImage: `url(${activeTheme.bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Mobile Frame Constraint (optional but looks nice on desktop) */}
      <div className="relative w-full max-w-md h-full flex flex-col z-10">
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative">
          {currentView === View.HOME && (
            <div className="absolute inset-0 animate-in fade-in zoom-in-95 duration-300">
               <Home entries={entries} onAddEntry={handleAddEntry} />
            </div>
          )}
          {currentView === View.JAR && (
             <div className="absolute inset-0 animate-in slide-in-from-right duration-300">
               <Jar entries={entries} />
             </div>
          )}
          {currentView === View.STATS && (
             <div className="absolute inset-0 animate-in slide-in-from-bottom duration-300">
               <Statistics entries={entries} />
             </div>
          )}
          {currentView === View.SETTINGS && (
             <div className="absolute inset-0 animate-in fade-in duration-300">
               <Settings currentThemeId={themeId} onThemeChange={setThemeId} />
             </div>
          )}
        </main>

        {/* Navigation */}
        <BottomNav currentView={currentView} onChangeView={setCurrentView} />
      </div>
    </div>
  );
};

export default App;