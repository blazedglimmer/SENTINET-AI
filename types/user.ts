export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: 'user' | 'admin';
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  emojiStyle: 'native' | 'twemoji';
  notifications: boolean;
}

export type UserUpdatePayload = Partial<Omit<UserProfile, 'id'>>;
