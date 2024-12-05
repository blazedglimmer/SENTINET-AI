import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
// import { motion } from 'framer-motion';
import { ArrowRight, StopCircle } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  cancelGeneration: () => void;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  isLoading,
  cancelGeneration,
}: ChatInputProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form
        onSubmit={e => {
          e.preventDefault();
          if (value.trim()) {
            onSubmit();
          }
        }}
        className="relative flex items-center"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full px-4 py-3 pr-24 text-sm rounded-full border border-input bg-background focus:outline-none "
            // focus:ring-1 focus:ring-offset-1 focus:ring-primary
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8"
            >
              <Icons.addCircle className="h-5 w-5" />
            </Button>
            {/* {value.trim() && (
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                disabled={isLoading}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            )} */}
            {isLoading ? (
              <Button
                type="button"
                onClick={cancelGeneration}
                className="flex items-center gap-2 rounded-full"
              >
                <StopCircle className="w-4 h-4" />
                {/* Stop */}
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                disabled={isLoading}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            )}
            {/* <motion.div
              initial={false}
              animate={{
                scale: isLoading ? 1 : 0,
                opacity: isLoading ? 1 : 0,
              }}
            >
              <div className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                4s - mini
              </div>
            </motion.div> */}
          </div>
        </div>
      </form>
    </div>
  );
}
