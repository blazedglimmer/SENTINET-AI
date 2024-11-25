'use client';

import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { CodeBlock } from '@/components/messages/code-block';
import { formatTimestamp } from '@/utils/formatting';

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 p-4 rounded-lg',
        message.role === 'user' ? 'bg-primary-foreground' : 'bg-muted'
      )}
    >
      <div className="flex justify-between items-center">
        <span className="font-medium">
          {message.role === 'user' ? 'You' : 'Assistant'}
        </span>
        <span className="text-sm text-muted-foreground">
          {formatTimestamp(message.timestamp)}
        </span>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <CodeBlock content={message.content} />
      </div>
    </div>
  );
}
