import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell, LineChart, Line, YAxis, PieChart, Pie } from 'recharts';
import { MoodEntry, MoodType } from '../types';
import { MOODS } from '../constants';
import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';

interface StatisticsProps {
  entries: MoodEntry[];
}

export const Statistics: React.FC<StatisticsProps> = ({ entries }) => {
  
  // Prepare Data for "Week Dist" (Bar Chart)
  const today = new Date();
  const last7Days = Array.from({ length: 7 }).map((_, i) => subDays(today, 6 - i));
  
  const weekData = last7Days.map(day => {
    const dayEntries = entries.filter(e => isSameDay(e.date, day));
    // Find most frequent mood or average score? Let's do count of dominant mood for now or just daily score average.
    // Video shows stacked bars or simple bars for frequency. Let's do Score Average for Trend and Count for Distribution.
    
    // Actually, video shows "Week Dist" as a bar chart with counts per mood category? 
    // Or maybe counts per day colored by mood. Let's do Counts Per Day colored by dominant mood.
    
    const entry = dayEntries[0]; // Simplify to one entry per day for this demo
    return {
      day: format(day, 'EEE'),
      score: entry ? MOODS[entry.mood].score : 0,
      moodColor: entry ? MOODS[entry.mood].color : '#333',
      label: entry ? MOODS[entry.mood].label : '',
    };
  });

  // Prepare Data for "Week Trend" (Line Chart)
  // Smoothing the curve
  const trendData = weekData.map(d => ({ day: d.day, score: d.score || null }));

  // Prepare Data for "Mood Overview" (Pie Chart)
  const moodCounts = entries.reduce((acc, curr) => {
    acc[curr.mood] = (acc[curr.mood] || 0) + 1;
    return acc;
  }, {} as Record<MoodType, number>);

  const pieData = Object.entries(moodCounts).map(([moodType, count]) => ({
    name: MOODS[moodType as MoodType].label,
    value: count,
    color: MOODS[moodType as MoodType].color,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 rounded border border-gray-700 shadow-xl text-xs">
          <p className="text-white font-bold">{label}</p>
          <p style={{ color: payload[0].payload.moodColor || '#fff' }}>
            {payload[0].payload.label || 'No Data'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full w-full overflow-y-auto no-scrollbar pt-10 px-6 pb-24">
      <h1 className="text-2xl font-bold text-white mb-6">Mood Statistics</h1>

      {/* Time Toggle */}
      <div className="glass-panel p-1 rounded-xl flex mb-6">
        {['Week', 'Month', '6 Months'].map((t, i) => (
          <button 
            key={t} 
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${i === 0 ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Week Distribution */}
      <div className="glass-panel rounded-3xl p-5 mb-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
          <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
          Week Score
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekData}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 10 }} 
                dy={10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
              <Bar dataKey="score" radius={[4, 4, 4, 4]} barSize={12}>
                {weekData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.moodColor} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Week Trend */}
      <div className="glass-panel rounded-3xl p-5 mb-6">
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
              Mood Trend
            </h3>
            <span className="text-xs text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded">+5.6 avg</span>
         </div>
         <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#A78BFA" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#1f2937', stroke: '#A78BFA', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: '#A78BFA' }}
              />
            </LineChart>
          </ResponsiveContainer>
         </div>
      </div>

      {/* Mood Overview */}
      <div className="glass-panel rounded-3xl p-5 mb-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
          <span className="w-1 h-4 bg-pink-500 rounded-full"></span>
          Overview
        </h3>
        <div className="flex items-center">
          <div className="h-40 w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={35}
                  outerRadius={55}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2 grid grid-cols-1 gap-2">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-gray-300">{entry.name}</span>
                <span className="ml-auto font-mono text-gray-500">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};