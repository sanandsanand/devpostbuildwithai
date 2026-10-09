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
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-white">
      <header className="py-4 text-center">
        <h1 className="text-xl font-semibold text-gray-800">Relentless Challenger</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 font-medium text-lg">
            What are you working on today?
          </div>
        ) : (
          messages.map((m: any) => <Message key={m.id} message={m} />)
        )}
      </main>

      <form onSubmit={handleSubmit} className="px-4 pb-6 pt-2 bg-white w-full">
        <div className="relative bg-[#f4f4f4] rounded-3xl p-2 flex flex-col shadow-sm border border-gray-200 focus-within:ring-1 focus-within:ring-gray-300 transition-all">
          {image && (
            <div className="px-3 pt-3 pb-1 relative inline-block">
              <img src={image} alt="Upload preview" className="h-16 w-auto rounded-lg border border-gray-200" />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute top-1 -right-1 bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-gray-700 shadow-sm"
              >
                ×
              </button>
            </div>
          )}
          <div className="flex items-end gap-2">
            <label className="flex items-center justify-center cursor-pointer p-2 text-gray-500 hover:text-gray-800 transition-colors rounded-full hover:bg-gray-200">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            </label>
            <input
              className="flex-1 bg-transparent px-2 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0"
              value={input}
              placeholder="Message Challenger..."
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={!input.trim() && !image}
              className="p-2 mb-1 mr-1 bg-black text-white rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
