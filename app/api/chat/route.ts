import { mistral } from '@ai-sdk/mistral';
import { streamText, StreamTextResult } from 'ai';

// Define an empty tools record since we're not using any tools
type NoTools = Record<string, never>;

export async function POST(req: Request) {
  try {
    const { messages, config } = await req.json();

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages format', { status: 400 });
    }
    if (!config || typeof config !== 'object') {
      return new Response('Invalid config format', { status: 400 });
    }

    // Initialize the Mistral language model
    const model = mistral('mistral-large-latest', {
      safePrompt: true,
    });

    // Create the stream with proper typing for no tools
    const response: StreamTextResult<NoTools> = streamText({
      model,
      messages,
      temperature: config.temperature ?? 0.7,
      topP: config.topP ?? 0.9,
      frequencyPenalty: config.frequencyPenalty ?? 0.0,
      presencePenalty: config.presencePenalty ?? 0.0,
    });

    // Access the text stream directly
    const stream = response.textStream;

    // Create a ReadableStream from the text stream
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const text of stream) {
            controller.enqueue(new TextEncoder().encode(text));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    // Return the readable stream as a response
    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
