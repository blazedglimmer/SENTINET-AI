'use client';

import { useEffect, useState } from 'react';
import { openDB, IDBPDatabase } from 'idb';
import { Message } from '@/types/chat';

const DB_NAME = 'chat-history';
const STORE_NAME = 'conversations';

interface ConversationCache {
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
  saveMessages: (messages: Message[]) => Promise<void>;
  clearHistory: () => Promise<void>;
}

export function useConversationCache(): ConversationCache {
  const [db, setDb] = useState<IDBPDatabase | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await openDB(DB_NAME, 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
              db.createObjectStore(STORE_NAME, { keyPath: 'timestamp' });
            }
          },
        });
        setDb(database);

        // Load existing messages
        const store = database
          .transaction(STORE_NAME, 'readonly')
          .objectStore(STORE_NAME);
        const existingMessages = await store.getAll();
        setMessages(existingMessages);
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error('Failed to initialize database')
        );
        setIsLoading(false);
      }
    };

    initDB();

    return () => {
      db?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveMessages = async (newMessages: Message[]) => {
    if (!db) return;

    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      // Clear existing messages
      await store.clear();

      // Add all messages
      for (const message of newMessages) {
        await store.add(message);
      }

      setMessages(newMessages);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to save messages')
      );
    }
  };

  const clearHistory = async () => {
    if (!db) return;

    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      await store.clear();
      setMessages([]);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to clear history')
      );
    }
  };

  return { messages, isLoading, error, saveMessages, clearHistory };
}
