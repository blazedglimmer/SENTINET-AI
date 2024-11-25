'use client';

import { ModelConfig } from '@/hooks/use-model-config';
import { ParameterSlider } from '@/components/controls/parameter-slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ModelControlsProps {
  config: ModelConfig;
  onConfigUpdate: (config: Partial<ModelConfig>) => void;
}

export function ModelControls({ config, onConfigUpdate }: ModelControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ParameterSlider
          label="Temperature"
          value={config.temperature}
          onChange={value => onConfigUpdate({ temperature: value })}
          min={0}
          max={2}
          step={0.1}
        />
        <ParameterSlider
          label="Top P"
          value={config.topP}
          onChange={value => onConfigUpdate({ topP: value })}
          min={0}
          max={1}
          step={0.1}
        />
        <ParameterSlider
          label="Frequency Penalty"
          value={config.frequencyPenalty}
          onChange={value => onConfigUpdate({ frequencyPenalty: value })}
          min={0}
          max={2}
          step={0.1}
        />
        <ParameterSlider
          label="Presence Penalty"
          value={config.presencePenalty}
          onChange={value => onConfigUpdate({ presencePenalty: value })}
          min={0}
          max={2}
          step={0.1}
        />
      </CardContent>
    </Card>
  );
}
