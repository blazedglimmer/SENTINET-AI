import { FallbackProps } from 'react-error-boundary';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="p-6 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800">
      <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
        <AlertCircle className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Something went wrong</h2>
      </div>
      <div className="mt-2 text-sm text-red-600 dark:text-red-300">
        {error.message}
      </div>
      <div className="mt-4">
        <Button
          onClick={resetErrorBoundary}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          Try again
        </Button>
      </div>
    </div>
  );
}
