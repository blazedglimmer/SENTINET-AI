'use client';

import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { CodeBlock } from '@/components/messages/code-block';
import { formatTimestamp } from '@/utils/formatting';
import { ReactNode } from 'react';
import 'katex/dist/katex.min.css';
import { Icons } from '@/components/icons';

interface MessageItemProps {
  message: Message;
  isUser: boolean;
  showTimestamp?: boolean;
}

export function MessageItem({
  message,
  isUser,
  showTimestamp,
}: MessageItemProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 p-4 rounded-lg'
        // isUser
        //   ? 'bg-stone-50 dark:bg-neutral-700'
        //   : 'bg-gray-100 dark:bg-gray-700'
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {!isUser && (
            <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full">
              <Icons.logo className="h-8 w-8 dark:invert" />
            </div>
          )}
          <span className="font-medium">{isUser ? 'You' : 'Assistant'}</span>
        </div>
        {showTimestamp && (
          <span className="text-sm text-muted-foreground">
            {formatTimestamp(message.timestamp)}
          </span>
        )}
      </div>
      <div
        className={cn('prose dark:prose-invert max-w-none', !isUser && 'ml-10')}
      >
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            p: ({ children }) => (
              <div className="mb-4 last:mb-0">{children}</div>
            ),
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
              if (inline) {
                return (
                  <code
                    className="px-1.5 py-0.5 rounded-md bg-gray-200 dark:bg-gray-800 text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }

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
            pre: ({ children }) => <>{children}</>,
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
