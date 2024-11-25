'use client';

import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '@/components/messages/code-block';
import { formatTimestamp } from '@/utils/formatting';
import { ReactNode } from 'react';

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
      <ReactMarkdown
        components={{
          p: ({ children }) => <div>{children}</div>,
          code: ({
            inline,
            className,
            children,
            ...props
          }: {
            inline?: boolean;
            className?: string;
            children?: ReactNode;
          }) => {
            // If it's an inline code, render as it is
            if (inline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded-md bg-gray-200 dark:bg-gray-800 text-sm"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            // For code blocks
            return (
              <CodeBlock
                content={
                  '```' +
                  (className?.replace('language-', '') || '') +
                  '\n' +
                  children +
                  '```'
                }
              />
            );
          },
          pre: ({ children }) => <>{children}</>, // Prevent double wrapping
        }}
        className="prose dark:prose-invert max-w-none"
      >
        {message.content}
      </ReactMarkdown>
    </div>
  );
}
