'use client';

import { useState } from 'react';
import { Message } from '@/types/chat';
import { ModelConfig } from '@/hooks/use-model-config';

export function useStream() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const streamMessage = async (content: string, config: ModelConfig) => {
    setIsLoading(true);
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          config,
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const assistantMessage: Message = {
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        assistantMessage.content += text;

        setMessages(prev => [...prev.slice(0, -1), { ...assistantMessage }]);
      }
    } catch (error) {
      console.error('Error streaming message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, streamMessage };
}
