import React, { useEffect, useState } from 'react';
import { MoodEntry, MoodType } from '../types';
import { MOODS } from '../constants';

interface JarProps {
  entries: MoodEntry[];
}

export const Jar: React.FC<JarProps> = ({ entries }) => {
  const [animatedEntries, setAnimatedEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    // Stagger animation on mount
    setAnimatedEntries([]);
    const timeout = setTimeout(() => {
      setAnimatedEntries(entries);
    }, 100);
    return () => clearTimeout(timeout);
  }, [entries]);

  return (
    <div className="h-full w-full flex flex-col items-center pt-16 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(100,100,255,0.1),transparent_70%)]" />

      <h2 className="text-2xl font-bold text-white mb-8 z-10 animate-float">Your Mood Jar</h2>

      {/* The Jar Container */}
      <div className="relative w-64 h-96 z-10">
        {/* Jar Body */}
        <div className="absolute inset-0 jar-glass rounded-b-[4rem] rounded-t-lg border-t-0 overflow-hidden">
           {/* Reflection */}
           <div className="absolute top-4 right-4 w-4 h-32 bg-white/10 rounded-full blur-sm transform -rotate-6" />
           <div className="absolute bottom-4 left-6 w-12 h-12 bg-white/5 rounded-full blur-xl" />

           {/* Mood Items */}
           <div className="absolute inset-0 p-4 flex flex-wrap-reverse content-start gap-1 overflow-hidden">
             {animatedEntries.map((entry, index) => {
               const mood = MOODS[entry.mood];
               // Pseudo-random position for natural look inside jar (simplified)
               const randomRotate = (index * 37) % 360; 
               const delay = Math.min(index * 50, 2000); // Cap delay
               
               return (
                 <div
                   key={entry.id}
                   className="w-10 h-10 flex items-center justify-center transition-all duration-700 ease-out"
                   style={{
                     transform: `rotate(${randomRotate}deg)`,
                     animation: `dropIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                     animationDelay: `${index * 0.05}s`,
                     opacity: 0, // Start hidden, animation handles opacity
                   }}
                 >
                   <span 
                    className="text-3xl filter drop-shadow-lg transform hover:scale-125 transition-transform cursor-pointer"
                    title={`${formatDate(entry.date)}: ${mood.label}`}
                   >
                     {mood.icon}
                   </span>
                 </div>
               );
             })}
           </div>
        </div>

        {/* Jar Lid */}
        <div className="absolute -top-4 left-[-10px] right-[-10px] h-6 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 rounded-sm shadow-lg border border-gray-400" />
        {/* Lid Label */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-[#f4e4bc] text-gray-800 px-3 py-1 rounded-sm shadow-sm font-serif text-xs rotate-2 border border-[#d4c49c]">
           SoulFlow
        </div>
      </div>

      <div className="mt-8 text-center z-10">
        <p className="text-purple-200 text-sm font-medium px-8 py-2 glass-panel rounded-full inline-block">
          {entries.length} memories collected
        </p>
      </div>

      <style>{`
        @keyframes dropIn {
          0% { transform: translateY(-300px) rotate(0deg); opacity: 0; }
          60% { transform: translateY(20px) rotate(180deg); opacity: 1; }
          100% { transform: translateY(0px) rotate(${Math.random() * 360}deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

function formatDate(date: Date) {
  return date.toLocaleDateString();
}