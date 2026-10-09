'use client';

import { useChat } from '@ai-sdk/react';
import { Message } from '@/components/Message';
import { useState, useEffect } from 'react';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({ id: 'chat' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto px-4 bg-white dark:bg-black">
      <header className="py-6 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">AI Tutor</h1>
      </header>

      <main className="flex-1 overflow-y-auto py-6">
        {messages.length === 0 ? (
          <div className="text-center text-zinc-500 mt-20">
            Send a message to start the conversation.
          </div>
        ) : (
          messages.map((m: any) => <Message key={m.id} message={m} />)
        )}
      </main>

      <form onSubmit={handleSubmit} className="py-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-full border border-zinc-300 bg-white px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            value={input}
            placeholder="Type your message..."
            onChange={handleInputChange}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
