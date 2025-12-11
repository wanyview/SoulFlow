import { MoodType, MoodConfig, Theme } from './types';

export const MOODS: Record<MoodType, MoodConfig> = {
  [MoodType.JOY]: { type: MoodType.JOY, label: 'Joy', icon: '😺', color: '#FCD34D', score: 10 },
  [MoodType.CALM]: { type: MoodType.CALM, label: 'Calm', icon: '😸', color: '#6EE7B7', score: 8 },
  [MoodType.SAD]: { type: MoodType.SAD, label: 'Sad', icon: '😿', color: '#93C5FD', score: 4 },
  [MoodType.ANGER]: { type: MoodType.ANGER, label: 'Anger', icon: '😾', color: '#F87171', score: 2 },
  [MoodType.FEAR]: { type: MoodType.FEAR, label: 'Fear', icon: '🙀', color: '#C4B5FD', score: 3 },
  [MoodType.DISGUST]: { type: MoodType.DISGUST, label: 'Disgust', icon: '😽', color: '#86EFAC', score: 5 },
};

export const THEMES: Theme[] = [
  { id: 'starry', name: 'Starry Night', bgImage: 'https://images.unsplash.com/photo-1534233650905-52b821935d27?q=80&w=1000&auto=format&fit=crop', accentColor: '#A78BFA' },
  { id: 'sunset', name: 'Sunset Dream', bgImage: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9d869?q=80&w=1000&auto=format&fit=crop', accentColor: '#F472B6' },
  { id: 'ocean', name: 'Deep Ocean', bgImage: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1000&auto=format&fit=crop', accentColor: '#60A5FA' },
  { id: 'forest', name: 'Mystic Forest', bgImage: 'https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=1000&auto=format&fit=crop', accentColor: '#34D399' },
];

export const INITIAL_QUOTES = [
  "Keep your face always toward the sunshine—and shadows will fall behind you.",
  "You are enough just as you are.",
  "Every day may not be good, but there's something good in every day.",
  "Believe you can and you're halfway there.",
];