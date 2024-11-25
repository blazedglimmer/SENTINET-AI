'use client';

import { useState } from 'react';
import { MessageWindow } from '@/components/messages/message-window';
import { ModelControls } from '@/components/controls/model-controls';
import { useModelConfig } from '@/hooks/use-model-config';
import { useStream } from '@/hooks/use-stream';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Playground() {
  const [input, setInput] = useState('');
  const { modelConfig, updateConfig } = useModelConfig();
  const { messages, isLoading, streamMessage } = useStream();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setInput('');
    await streamMessage(input, modelConfig);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/4">
          <MessageWindow messages={messages} isLoading={isLoading} />
        </div>
        <div className="w-full md:w-1/4">
          <ModelControls config={modelConfig} onConfigUpdate={updateConfig} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter your message..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
