'use client';

import { Message } from '@/types/chat';
import { formatTimestamp } from '@/utils/formatting';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ConversationHistoryProps {
  messages: Message[];
}

export function ConversationHistory({ messages }: ConversationHistoryProps) {
  // Group messages by conversation (based on timestamps within 5 minutes of each other)
  const conversations = messages.reduce((acc: Message[][], message) => {
    const lastConversation = acc[acc.length - 1];
    if (!lastConversation) {
      return [[message]];
    }

    const lastMessage = lastConversation[lastConversation.length - 1];
    const timeDiff = Math.abs(
      new Date(message.timestamp).getTime() -
        new Date(lastMessage.timestamp).getTime()
    );

    // If messages are within 5 minutes of each other, they're part of the same conversation
    if (timeDiff <= 5 * 60 * 1000) {
      lastConversation.push(message);
      return acc;
    }

    return [...acc, [message]];
  }, []);

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4">Conversation History</h3>
        <ScrollArea className="h-[200px]">
          <div className="space-y-4">
            {conversations.map((conversation, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/50">
                <div className="text-sm text-muted-foreground mb-2">
                  {formatTimestamp(conversation[0].timestamp)}
                </div>
                {conversation.map((message, j) => (
                  <div key={j} className="ml-4 text-sm">
                    <span className="font-medium">
                      {message.role === 'user' ? 'You: ' : 'Assistant: '}
                    </span>
                    <span className="text-muted-foreground">
                      {message.content.length > 50
                        ? `${message.content.substring(0, 50)}...`
                        : message.content}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
