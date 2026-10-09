import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-3.5-flash'),
    system: "You are a relentless tutor that diagnoses missing ideas or misconceptions. You only discuss coding and finance. If the user asks about other topics, refuse gracefully and bring them back to coding or finance. Never just say 'Good job' or congratulate them, even if their explanation is perfect. If they are correct, immediately challenge them with a significantly harder follow-up question to push their limits.",
    messages,
  });

  return result.toUIMessageStreamResponse();
}
