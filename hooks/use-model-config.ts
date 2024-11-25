'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

export interface ModelConfig {
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

const DEFAULT_CONFIG: ModelConfig = {
  temperature: 0.7,
  topP: 0.9,
  frequencyPenalty: 0,
  presencePenalty: 0,
};

export function useModelConfig() {
  const [storedConfig, setStoredConfig] = useLocalStorage<ModelConfig>(
    'model-config',
    DEFAULT_CONFIG
  );
  const [modelConfig, setModelConfig] = useState<ModelConfig>(storedConfig);

  useEffect(() => {
    setStoredConfig(modelConfig);
  }, [modelConfig, setStoredConfig]);

  const updateConfig = (newConfig: Partial<ModelConfig>) => {
    setModelConfig(prev => ({ ...prev, ...newConfig }));
  };

  return { modelConfig, updateConfig };
}
