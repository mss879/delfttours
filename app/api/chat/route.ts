
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { SYSTEM_PROMPT } from '@/lib/ai-context';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        // Validate API key
        if (!process.env.OPENAI_API_KEY) {
            return new Response(JSON.stringify({ error: 'API key not configured' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { messages } = await req.json();

        // Validate messages
        if (!messages || !Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: 'Messages required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Format messages for the API
        const formattedMessages = messages.map((msg: any) => ({
            role: msg.role as 'user' | 'assistant' | 'system',
            content: typeof msg.content === 'string' ? msg.content : '',
        }));

        // Call OpenAI
        const result = await generateText({
            model: openai('gpt-4o-mini'),
            system: SYSTEM_PROMPT,
            messages: formattedMessages,
        });

        // Return response
        return new Response(JSON.stringify({ content: result.text }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('AI Chat Error:', error);
        return new Response(JSON.stringify({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : String(error)
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
