export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  color?: string;
  category?: string;
}

export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  date: string;
}

export interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  population?: number;
  region?: string;
}

export interface TouristPlace {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  city: string;
  category: string;
  icon: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  description: string;
  icon: string;
  category: string;
}

export interface UnitCategory {
  id: string;
  name: string;
  icon: string;
  units: Unit[];
}

export interface Unit {
  id: string;
  name: string;
  symbol: string;
  toBase: number;
}

export interface AppSettings {
  language: 'fr' | 'en';
  darkMode: boolean;
  selectedCity: string;
  notificationsEnabled: boolean;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

export type RootStackParamList = {
  MainTabs: undefined;
  NoteDetail: { noteId?: string };
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Currency: undefined;
  Prayer: undefined;
  Emergency: undefined;
  Notes: undefined;
  AI: undefined;
};
