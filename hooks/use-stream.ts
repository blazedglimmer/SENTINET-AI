'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import { ModelConfig } from '@/hooks/use-model-config';
import { useMetrics } from '@/hooks/use-metrics';
import { useConversationCache } from '@/hooks/use-conversation-cache';

export function useStream() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortController = useRef<AbortController | null>(null);
  const { metrics, updateMetrics, resetMetrics } = useMetrics();
  const {
    saveMessages,
    loadMessages,
    clearHistory: clearCachedHistory,
  } = useConversationCache();

  // Load messages from IndexedDB when component mounts
  useEffect(() => {
    const loadInitialMessages = async () => {
      const cachedMessages = await loadMessages();
      if (cachedMessages) {
        setMessages(cachedMessages);
      }
    };
    loadInitialMessages();
  }, [loadMessages]);

  const cancelGeneration = () => {
    if (abortController.current) {
      abortController.current.abort();
      abortController.current = null;
      setIsLoading(false);
    }
  };

  const clearHistory = async () => {
    await clearCachedHistory();
    setMessages([]);
  };

  const streamMessage = async (content: string, config: ModelConfig) => {
    setIsLoading(true);
    resetMetrics();

    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    // Immediately update messages with user's message
    setMessages(prev => [...prev, userMessage]);
    await saveMessages([...messages, userMessage]);

    try {
      abortController.current = new AbortController();

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          config,
        }),
        signal: abortController.current.signal,
      });

      if (!response.ok) throw new Error('Failed to send message');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const assistantMessage: Message = {
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
      };

      // Add empty assistant message immediately
      setMessages(prev => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        assistantMessage.content += text;
        updateMetrics(text);

        // Update the last message (assistant's message)
        setMessages(prev => [...prev.slice(0, -1), { ...assistantMessage }]);
      }

      // Save to IndexedDB after completion
      const updatedMessages = [...messages, userMessage, assistantMessage];
      await saveMessages(updatedMessages);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Message generation cancelled');
      } else {
        console.error('Error streaming message:', error);
      }
    } finally {
      setIsLoading(false);
      abortController.current = null;
    }
  };

  return {
    messages,
    isLoading,
    streamMessage,
    cancelGeneration,
    clearHistory,
    metrics,
  };
}
