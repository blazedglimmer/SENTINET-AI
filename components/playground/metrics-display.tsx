'use client';

import { Card, CardContent } from '@/components/ui/card';

interface MetricsDisplayProps {
  tokensPerSecond: number;
  totalTokens: number;
  estimatedTimeRemaining: number | null;
}

export function MetricsDisplay({
  tokensPerSecond,
  totalTokens,
  estimatedTimeRemaining,
}: MetricsDisplayProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-4">
          <div className="text-sm font-medium text-muted-foreground">
            Tokens/sec
          </div>
          <div className="text-2xl font-bold">{tokensPerSecond.toFixed(1)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-4">
          <div className="text-sm font-medium text-muted-foreground">
            Total Tokens
          </div>
          <div className="text-2xl font-bold">{totalTokens}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-4">
          <div className="text-sm font-medium text-muted-foreground">
            Est. Time
          </div>
          <div className="text-2xl font-bold">
            {estimatedTimeRemaining ? `${estimatedTimeRemaining}s` : '—'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
