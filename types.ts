export enum View {
  HOME = 'HOME',
  JAR = 'JAR',
  STATS = 'STATS',
  SETTINGS = 'SETTINGS',
}

export enum MoodType {
  JOY = 'JOY',
  CALM = 'CALM',
  SAD = 'SAD',
  ANGER = 'ANGER',
  FEAR = 'FEAR',
  DISGUST = 'DISGUST',
}

export interface MoodConfig {
  type: MoodType;
  label: string;
  icon: string; // Emoji
  color: string;
  score: number; // For charts
}

export interface MoodEntry {
  id: string;
  date: Date;
  mood: MoodType;
  note: string;
}

export interface Theme {
  id: string;
  name: string;
  bgImage: string;
  accentColor: string;
}