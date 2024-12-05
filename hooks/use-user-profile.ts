'use client';

import { useState, useEffect } from 'react';
import { UserProfile, UserUpdatePayload } from '@/types/user';
import { useLocalStorage } from '@/hooks/use-local-storage';

const DEFAULT_USER: UserProfile = {
  id: '1',
  name: 'Guest User',
  email: 'guest@example.com',
  role: 'user',
  preferences: {
    theme: 'system',
    emojiStyle: 'native',
    notifications: true,
  },
};

export function useUserProfile() {
  const [storedUser, setStoredUser] = useLocalStorage<UserProfile>(
    'user-profile',
    DEFAULT_USER
  );
  const [user, setUser] = useState<UserProfile>(storedUser);

  useEffect(() => {
    setStoredUser(user);
  }, [user, setStoredUser]);

  const updateProfile = (updates: UserUpdatePayload) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const updatePreferences = (updates: Partial<UserProfile['preferences']>) => {
    setUser(prev => ({
      ...prev,
      preferences: { ...prev.preferences, ...updates },
    }));
  };

  return {
    user,
    updateProfile,
    updatePreferences,
  };
}
