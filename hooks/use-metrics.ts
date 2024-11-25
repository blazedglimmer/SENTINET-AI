'use client';

import { useState, useRef } from 'react';

interface Metrics {
  tokensPerSecond: number;
  totalTokens: number;
  estimatedTimeRemaining: number | null;
}

export function useMetrics() {
  const [metrics, setMetrics] = useState<Metrics>({
    tokensPerSecond: 0,
    totalTokens: 0,
    estimatedTimeRemaining: null,
  });

  const tokenCount = useRef(0);
  const startTime = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(Date.now());

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateMetrics = (newToken: string) => {
    const currentTime = Date.now();
    tokenCount.current += 1;

    if (!startTime.current) {
      startTime.current = currentTime;
    }

    const elapsedSeconds = (currentTime - (startTime.current || 0)) / 1000;
    const tokensPerSecond = tokenCount.current / elapsedSeconds;

    // Update metrics every 100ms to avoid too frequent updates
    if (currentTime - lastUpdateTime.current > 100) {
      setMetrics({
        tokensPerSecond: Math.round(tokensPerSecond * 10) / 10,
        totalTokens: tokenCount.current,
        estimatedTimeRemaining: null, // Will be calculated when we have the total expected tokens
      });
      lastUpdateTime.current = currentTime;
    }
  };

  const resetMetrics = () => {
    tokenCount.current = 0;
    startTime.current = null;
    setMetrics({
      tokensPerSecond: 0,
      totalTokens: 0,
      estimatedTimeRemaining: null,
    });
  };

  return { metrics, updateMetrics, resetMetrics };
}
