import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, subDays } from 'date-fns';
import { Plus, Quote } from 'lucide-react';
import { MoodEntry, MoodType } from '../types';
import { MOODS, INITIAL_QUOTES } from '../constants';

interface HomeProps {
  entries: MoodEntry[];
  onAddEntry: (mood: MoodType, note: string) => void;
}

export const Home: React.FC<HomeProps> = ({ entries, onAddEntry }) => {
  const [currentDate] = useState(new Date());
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  
  // Calendar Logic
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get today's entry
  const todayEntry = entries.find(e => isSameDay(e.date, new Date()));
  const streak = calculateStreak(entries);

  // Quote rotation (simple based on day)
  const quoteIndex = new Date().getDate() % INITIAL_QUOTES.length;
  const dailyQuote = INITIAL_QUOTES[quoteIndex];

  const handleMoodSelect = (mood: MoodType) => {
    onAddEntry(mood, "Feeling " + MOODS[mood].label.toLowerCase() + " today.");
    setShowMoodSelector(false);
  };

  return (
    <div className="h-full flex flex-col pt-10 px-6 pb-24 overflow-y-auto no-scrollbar">
      {/* Header */}
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
            SoulFlow
          </h1>
          <p className="text-gray-400 text-sm mt-1">{format(currentDate, 'MMMM yyyy')}</p>
        </div>
        <div className="glass-panel px-3 py-1 rounded-full text-xs font-semibold text-purple-200 border border-purple-500/30">
          PRO
        </div>
      </header>

      {/* Calendar Grid */}
      <div className="glass-panel rounded-3xl p-5 mb-6">
        <div className="grid grid-cols-7 gap-1 mb-2 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-gray-400 text-xs font-medium uppercase">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {/* Padding for start of month - simplified for this demo */}
          {Array.from({ length: monthStart.getDay() }).map((_, i) => (
            <div key={`pad-${i}`} />
          ))}
          
          {daysInMonth.map(day => {
            const entry = entries.find(e => isSameDay(e.date, day));
            const isCurrentDay = isToday(day);
            
            return (
              <div 
                key={day.toISOString()} 
                className={`aspect-square flex flex-col items-center justify-center rounded-xl relative transition-all
                  ${isCurrentDay ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5'}
                `}
              >
                <span className={`text-xs ${isCurrentDay ? 'font-bold text-white' : 'text-gray-400'}`}>
                  {format(day, 'd')}
                </span>
                {entry && (
                  <span className="text-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
                    {MOODS[entry.mood].icon}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's Stats */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 glass-panel rounded-2xl p-4 flex flex-col items-center justify-center">
           <span className="text-2xl font-bold text-white">{streak}</span>
           <span className="text-xs text-gray-400 uppercase tracking-wider">Day Streak</span>
        </div>
        <div className="flex-1 glass-panel rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
          {todayEntry ? (
            <>
              <span className="text-2xl animate-bounce">{MOODS[todayEntry.mood].icon}</span>
              <span className="text-xs text-gray-400 mt-1">{MOODS[todayEntry.mood].label}</span>
            </>
          ) : (
            <button 
              onClick={() => setShowMoodSelector(true)}
              className="w-full h-full flex flex-col items-center justify-center text-purple-300 hover:text-white transition-colors"
            >
              <Plus size={24} />
              <span className="text-xs mt-1">Log Mood</span>
            </button>
          )}
        </div>
      </div>

      {/* Daily Quote */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden">
        <Quote className="absolute top-4 left-4 text-white/10 w-12 h-12" />
        <div className="relative z-10">
          <p className="text-lg font-medium text-white/90 leading-relaxed italic">
            "{dailyQuote}"
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 flex items-center justify-center text-xs font-bold">
              AI
            </div>
            <div className="text-sm">
              <p className="text-white font-medium">Daily Wisdom</p>
              <p className="text-white/50 text-xs">Refresh for new perspective</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mood Selector Modal */}
      {showMoodSelector && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#1e1e24] w-full max-w-md rounded-3xl p-6 border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">How are you?</h2>
              <button 
                onClick={() => setShowMoodSelector(false)}
                className="text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {Object.values(MOODS).map((mood) => (
                <button
                  key={mood.type}
                  onClick={() => handleMoodSelect(mood.type)}
                  className="flex flex-col items-center p-3 rounded-2xl hover:bg-white/5 transition-colors group"
                >
                  <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">{mood.icon}</span>
                  <span className="text-sm font-medium" style={{ color: mood.color }}>{mood.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper for streak
function calculateStreak(entries: MoodEntry[]): number {
  if (entries.length === 0) return 0;
  
  const sortedEntries = [...entries].sort((a, b) => b.date.getTime() - a.date.getTime());
  let streak = 0;
  const today = new Date();
  
  // Check if there's an entry for today or yesterday to start the streak
  const hasToday = isSameDay(sortedEntries[0].date, today);
  const hasYesterday = isSameDay(sortedEntries[0].date, subDays(today, 1));
  
  if (!hasToday && !hasYesterday) return 0;

  let currentDate = hasToday ? today : subDays(today, 1);
  
  for (const entry of sortedEntries) {
    if (isSameDay(entry.date, currentDate)) {
      streak++;
      currentDate = subDays(currentDate, 1);
    } else if (entry.date > currentDate) {
      // Multiple entries same day, skip
      continue;
    } else {
      // Break in streak
      break;
    }
  }
  return streak;
}