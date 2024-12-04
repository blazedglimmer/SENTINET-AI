interface SuggestedPromptsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

export function SuggestedPrompts({ prompts, onSelect }: SuggestedPromptsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {prompts.map(prompt => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="px-4 py-2 text-sm rounded-full bg-muted hover:bg-muted/80 transition-colors"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
