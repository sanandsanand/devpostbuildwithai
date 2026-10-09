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
    <div className="flex flex-col h-screen max-w-3xl mx-auto px-4 bg-transparent">
      <header className="py-6 border-b border-white/20">
        <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent drop-shadow-sm">Relentless Challenger</h1>
      </header>

      <main className="flex-1 overflow-y-auto py-6">
        {messages.length === 0 ? (
          <div className="text-center text-slate-500/80 mt-20 font-medium">
            Ready for your first challenge. Send a message to start.
          </div>
        ) : (
          messages.map((m: any) => <Message key={m.id} message={m} />)
        )}
      </main>

      <form onSubmit={handleSubmit} className="pt-4 pb-12 border-t border-white/20">
        {image && (
          <div className="mb-4 relative inline-block">
            <img src={image} alt="Upload preview" className="h-24 w-auto rounded-xl border border-white/60 shadow-md backdrop-blur-sm" />
            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 bg-white/80 backdrop-blur-md text-slate-800 border border-white/60 rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-white shadow-sm"
            >
              ×
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <label className="flex items-center justify-center cursor-pointer bg-white/40 backdrop-blur-md border border-white/60 px-4 py-3 text-slate-600 transition-all hover:bg-white/60 shadow-sm rounded-full">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          </label>
          <input
            className="flex-1 bg-white/40 backdrop-blur-md border border-white/60 px-4 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50 rounded-full shadow-inner"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={!input.trim() && !image}
            className="bg-gradient-to-r from-purple-500 to-rose-500 text-white font-semibold hover:opacity-90 shadow-md rounded-full px-6 py-3 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
