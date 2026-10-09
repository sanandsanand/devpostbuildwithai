'use client';

import { useChat } from '@ai-sdk/react';
import { Message } from '@/components/Message';
import { useState, useEffect } from 'react';

export function Chat() {
  const { messages, sendMessage, setMessages } = useChat({ id: 'chat' });
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('chat_history');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }
    setMounted(true);
  }, [setMessages]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('chat_history', JSON.stringify(messages));
    }
  }, [messages, mounted]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !image) || !sendMessage) return;
    
    const parts: any[] = [];
    if (input.trim()) parts.push({ type: 'text', text: input });
    if (image) parts.push({ type: 'image', image });

    sendMessage({ parts, role: 'user' });
    setInput('');
    setImage(null);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto px-4 bg-zinc-950">
      <header className="py-6 border-b border-zinc-800">
        <h1 className="text-xl font-bold uppercase tracking-widest text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">Relentless Challenger</h1>
      </header>

      <main className="flex-1 overflow-y-auto py-6">
        {messages.length === 0 ? (
          <div className="text-center text-zinc-500 mt-20 font-mono">
            System ready. Awaiting input.
          </div>
        ) : (
          messages.map((m: any) => <Message key={m.id} message={m} />)
        )}
      </main>

      <form onSubmit={handleSubmit} className="pt-4 pb-12 border-t border-zinc-800">
        {image && (
          <div className="mb-4 relative inline-block">
            <img src={image} alt="Upload preview" className="h-24 w-auto rounded-lg border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]" />
            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-[0_0_8px_rgba(236,72,153,0.8)] hover:bg-pink-500"
            >
              ×
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <label className="flex items-center justify-center cursor-pointer rounded-full bg-zinc-900 border border-pink-500/50 px-4 py-3 text-pink-500 transition-colors hover:bg-pink-500/10 shadow-[0_0_10px_rgba(236,72,153,0.3)]">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          </label>
          <input
            className="flex-1 rounded-full border border-cyan-500/50 bg-zinc-900 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.1)] focus:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            value={input}
            placeholder="Initialize sequence..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={!input.trim() && !image}
            className="rounded-full bg-cyan-500 px-6 py-3 font-bold text-zinc-950 transition-colors hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)] hover:shadow-[0_0_20px_rgba(6,182,212,0.8)] disabled:opacity-50 disabled:shadow-none disabled:hover:bg-cyan-500"
          >
            EXECUTE
          </button>
        </div>
      </form>
    </div>
  );
}
