'use client';

import { memo, useState, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { MessageWindow } from '@/components/messages/message-window';
import { ModelControls } from '@/components/controls/model-controls';
import { MetricsDisplay } from '@/components/playground/metrics-display';
import { ConversationHistory } from '@/components/playground/conversation-history';
import { ErrorFallback } from '@/components/error-boundary/error-fallback';
import { useModelConfig } from '@/hooks/use-model-config';
import { useStream } from '@/hooks/use-stream';
import { useServiceWorker } from '@/hooks/use-service-worker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StopCircle, Trash2, RefreshCw } from 'lucide-react';
import { withRetry } from '@/utils/retry';
import { logError } from '@/utils/error-monitoring';

const MemoizedMessageWindow = memo(MessageWindow);
const MemoizedModelControls = memo(ModelControls);
const MemoizedMetricsDisplay = memo(MetricsDisplay);
const MemoizedConversationHistory = memo(ConversationHistory);

export function Playground() {
  const [input, setInput] = useState('');
  const { modelConfig, updateConfig } = useModelConfig();
  const {
    messages,
    isLoading,
    streamMessage,
    cancelGeneration,
    metrics,
    clearHistory,
  } = useStream();
  const [showHistory, setShowHistory] = useState(false);
  const { needsRefresh, refreshApp } = useServiceWorker();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;

      const trimmedInput = input.trim();
      setInput('');

      try {
        await withRetry(() => streamMessage(trimmedInput, modelConfig), {
          maxAttempts: 3,
          baseDelay: 1000,
        });
      } catch (error) {
        if (error instanceof Error) {
          logError(error, {
            input: trimmedInput,
            modelConfig,
          });
        }
        throw error; // Let ErrorBoundary handle it
      }
    },
    [input, modelConfig, streamMessage]
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
        {needsRefresh && (
          <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg flex items-center justify-between">
            <span>New version available!</span>
            <Button
              onClick={refreshApp}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Update
            </Button>
          </div>
        )}

        <MemoizedMetricsDisplay
          tokensPerSecond={metrics.tokensPerSecond}
          totalTokens={metrics.totalTokens}
          estimatedTimeRemaining={metrics.estimatedTimeRemaining}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/4 space-y-4">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setShowHistory(!showHistory)}
              >
                {showHistory ? 'Hide History' : 'Show History'}
              </Button>
              <Button
                variant="outline"
                onClick={clearHistory}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear History
              </Button>
            </div>

            {showHistory && <MemoizedConversationHistory messages={messages} />}
            <MemoizedMessageWindow messages={messages} isLoading={isLoading} />
          </div>
          <div className="w-full md:w-1/4">
            <MemoizedModelControls
              config={modelConfig}
              onConfigUpdate={updateConfig}
            />
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
    </ErrorBoundary>
  );
}
