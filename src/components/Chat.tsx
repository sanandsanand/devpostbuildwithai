/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element, react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, react-hooks/set-state-in-effect */
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
    <div className="flex flex-col h-[100dvh] w-full bg-white/20 backdrop-blur-sm overflow-hidden relative">
      <div className="flex flex-col h-full w-full max-w-5xl mx-auto relative z-10">

      <main className="flex-1 overflow-y-auto px-4 py-6 no-scrollbar relative" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-indigo-900/20 border border-indigo-400/30 rotate-12 hover:rotate-0 transition-all duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-rotate-12"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 tracking-tight mb-4">
              Ready for a challenge?
            </h2>
            <p className="text-slate-600 text-lg md:text-xl mb-12 max-w-lg leading-relaxed font-medium">
              I am your relentless AI tutor. Share a code snippet, architecture diagram, or finance concept. I won&apos;t just give you the answer&mdash;I will test you until you master it.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <button onClick={() => setInput("Explain the time complexity of QuickSort.")} className="flex flex-col text-left p-4 rounded-2xl bg-white/40 border border-white/50 hover:bg-white/60 backdrop-blur-md transition-all group shadow-sm">
                <span className="font-semibold text-slate-800 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> Algorithm Analysis</span>
                <span className="text-slate-600 text-sm mt-1">Explain the time complexity of QuickSort.</span>
              </button>
              <button onClick={() => setInput("Review my attached database schema.")} className="flex flex-col text-left p-4 rounded-2xl bg-white/40 border border-white/50 hover:bg-white/60 backdrop-blur-md transition-all group shadow-sm">
                <span className="font-semibold text-slate-800 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg> System Design</span>
                <span className="text-slate-600 text-sm mt-1">Review my attached database schema.</span>
              </button>
            </div>
          </div>
        ) : (
          messages.map((m: any) => <Message key={m.id} message={m} />)
        )}
      </main>

      <div className="relative shrink-0 w-full mt-auto">
        <form onSubmit={handleSubmit} className="px-4 pb-6 pt-2 w-full relative z-10">
          <div className="relative bg-white/40 backdrop-blur-xl rounded-3xl p-2 flex flex-col shadow-[0_4px_30px_-4px_rgba(0,0,0,0.1)] border border-white/60 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:shadow-lg transition-all duration-300">
            {image && (
              <div className="px-3 pt-3 pb-1 relative inline-block">
                <img src={image} alt="Upload preview" className="h-16 w-auto rounded-lg border border-slate-300 shadow-sm" />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 shadow-sm transition-colors"
                >
                  &times;
                </button>
              </div>
            )}
            <div className="flex items-end gap-2">
              <label className="flex items-center justify-center cursor-pointer p-2 text-slate-500 hover:text-indigo-600 hover:bg-white/50 transition-colors rounded-full mb-1 ml-1">
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              </label>
              <input
                className="flex-1 bg-transparent px-3 py-3 text-slate-900 placeholder-slate-500 font-medium focus:outline-none focus:ring-0 min-w-0"
                value={input}
                placeholder="Message Challenger..."
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={!input.trim() && !image}
                className="p-3 mb-1 mr-1 bg-indigo-600 text-white rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
              </button>
            </div>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
