'use client';

import { Navigation } from '@/components/layout/navigation';
import { ChatInput } from '@/components/chat/chat-input';
// import { ChatMessage } from '@/components/chat/chat-message';
import { SuggestedPrompts } from '@/components/chat/suggested-prompts';
import { Icons } from '@/components/icons';
import { useState, memo } from 'react';
import { useStream } from '@/hooks/use-stream';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageWindow } from '@/components/messages/message-window';

const suggestedPrompts = [
  "What's the meaning of life?",
  'How do you define love?',
  "What's the meaning of AI?",
];
const MemoizedMessageWindow = memo(MessageWindow);
export default function Home() {
  const [input, setInput] = useState('');
  const { messages, isLoading, streamMessage, cancelGeneration } = useStream();

  const handleSubmit = async () => {
    setInput('');
    if (!input.trim()) return;
    await streamMessage(input.trim(), {
      temperature: 0.7,
      topP: 0.9,
      frequencyPenalty: 0,
      presencePenalty: 0,
    });
  };

  return (
    <div className="flex bg-background">
      <Navigation />
      <main
        className="flex-1 flex flex-col p-4 md:p-8 max-h-screen overflow-y-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="w-full max-w-4xl mx-auto space-y-8 h-full">
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center flex-1 md:h-full h-[calc(100vh-6rem)]"
              >
                <Icons.logo className="h-12 w-12 mb-8 dark:invert" />
                <ChatInput
                  value={input}
                  onChange={setInput}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  cancelGeneration={cancelGeneration}
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
                className="space-y-4 w-full"
              >
                {/* {messages.map((message, index) => (
                  <ChatMessage
                    key={message.timestamp}
                    message={message}
                    isStreaming={isLoading && index === messages.length - 1}
                  />
                ))} */}

                <MemoizedMessageWindow
                  messages={messages}
                  isLoading={isLoading}
                />
                <div className="sticky bottom-[-15] p-4 bg-background">
                  <ChatInput
                    value={input}
                    onChange={setInput}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    cancelGeneration={cancelGeneration}
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
