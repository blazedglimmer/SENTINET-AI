'use client';

import { useState } from 'react';
import { MessageWindow } from '@/components/messages/message-window';
import { ModelControls } from '@/components/controls/model-controls';
import { MetricsDisplay } from '@/components/playground/metrics-display';
import { useModelConfig } from '@/hooks/use-model-config';
import { useStream } from '@/hooks/use-stream';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StopCircle } from 'lucide-react';

export function Playground() {
  const [input, setInput] = useState('');
  const { modelConfig, updateConfig } = useModelConfig();
  const { messages, isLoading, streamMessage, cancelGeneration, metrics } =
    useStream();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setInput('');
    await streamMessage(input, modelConfig);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
      <MetricsDisplay
        tokensPerSecond={metrics.tokensPerSecond}
        totalTokens={metrics.totalTokens}
        estimatedTimeRemaining={metrics.estimatedTimeRemaining}
      />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/4">
          <MessageWindow messages={messages} isLoading={isLoading} />
        </div>
        <div className="w-full md:w-1/4">
          <ModelControls config={modelConfig} onConfigUpdate={updateConfig} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter your message..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isLoading ? (
          <Button
            type="button"
            variant="destructive"
            onClick={cancelGeneration}
            className="flex items-center gap-2"
          >
            <StopCircle className="w-4 h-4" />
            Stop
          </Button>
        ) : (
          <Button type="submit" disabled={isLoading}>
            Send
          </Button>
        )}
      </form>
    </div>
  );
}
