'use client';
import { Message } from '@/types/chat';
import { Icons } from '@/components/icons';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex w-full gap-4 py-4', isUser && 'flex-row-reverse')}
    >
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full">
        {!isUser && <Icons.logo className="h-8 w-8 dark:invert" />}
      </div>

      <div className="flex-1 space-y-2">
        <div className="text-sm font-medium">
          {isUser ? 'You' : 'Assistant'}
        </div>
        <div className="text-sm text-muted-foreground">
          {message.content}
          {isStreaming && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ▍
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
