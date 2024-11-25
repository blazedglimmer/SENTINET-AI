'use client';

import { Message } from '@/types/chat';
import { MessageItem } from '@/components/messages/message-item';
import { Virtuoso } from 'react-virtuoso';

interface MessageWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageWindow({ messages, isLoading }: MessageWindowProps) {
  return (
    <div className="h-[calc(100svh-14rem)] border border-gray-200 dark:border-gray-800 rounded-lg bg-background">
      <Virtuoso
        data={messages}
        itemContent={(index, message) => (
          <div className="p-2">
            <MessageItem message={message} />
          </div>
        )}
        followOutput="smooth"
        alignToBottom
        className="h-full"
      />
      {isLoading && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
