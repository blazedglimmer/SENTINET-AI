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
        'flex flex-col gap-2 p-4 rounded-lg',
        isUser
          ? 'bg-blue-50 dark:bg-blue-900/10'
          : 'bg-gray-50 dark:bg-gray-900/10'
      )}
    >
      <div className="flex justify-between items-center">
        <span className="font-medium">{isUser ? 'You' : 'Assistant'}</span>
        {showTimestamp && (
          <span className="text-sm text-muted-foreground">
            {formatTimestamp(message.timestamp)}
          </span>
        )}
      </div>
      <div className="prose dark:prose-invert max-w-none">
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
