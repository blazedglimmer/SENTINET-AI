'use client';

import { Navigation } from '@/components/layout/navigation';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessage } from '@/components/chat/chat-message';
import { SuggestedPrompts } from '@/components/chat/suggested-prompts';
import { Icons } from '@/components/icons';
import { useState } from 'react';
import { useStream } from '@/hooks/use-stream';
import { motion, AnimatePresence } from 'framer-motion';

const suggestedPrompts = [
  "What's the meaning of life?",
  'How do you define love?',
  "What's the meaning of AI?",
];

export default function Home() {
  const [input, setInput] = useState('');
  const { messages, streamMessage, isLoading } = useStream();

  const handleSubmit = async () => {
    if (!input.trim()) return;
    await streamMessage(input.trim(), {
      temperature: 0.7,
      topP: 0.9,
      frequencyPenalty: 0,
      presencePenalty: 0,
    });
    setInput('');
  };

  return (
    <div className="flex bg-background">
      <Navigation />
      <main
        className="flex-1 flex flex-col p-4 md:p-8 max-h-screen overflow-y-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center flex-1 min-h-[60vh]"
              >
                <Icons.logo className="h-12 w-12 mb-8 dark:invert" />
                <ChatInput
                  value={input}
                  onChange={setInput}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
                <SuggestedPrompts
                  prompts={suggestedPrompts}
                  onSelect={prompt => setInput(prompt)}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {messages.map((message, index) => (
                  <ChatMessage
                    key={message.timestamp}
                    message={message}
                    isStreaming={isLoading && index === messages.length - 1}
                  />
                ))}
                <div className="sticky bottom-[-15] p-4 bg-background">
                  <ChatInput
                    value={input}
                    onChange={setInput}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                  />
                  <div className="text-xs text-zinc-400 text-center mt-2">
                    {' '}
                    AI can make mistakes. Check important info.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
