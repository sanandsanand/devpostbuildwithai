/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
import { useState } from 'react';
import { UIMessage } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export function Message({ message }: { message: UIMessage }) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const isUser = message.role === 'user';
  return (
    <>
      <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-8 group`}>
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center mr-3 mt-1 shadow-sm shrink-0 border border-white/50 text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
          </div>
        )}
        <div
          className={`min-w-0 ${
            isUser
              ? 'bg-white/60 backdrop-blur-md border border-white/50 text-slate-900 rounded-3xl rounded-tr-sm px-5 py-3 max-w-[85%] shadow-sm'
              : 'bg-white/40 backdrop-blur-md border border-white/50 text-slate-800 rounded-3xl rounded-tl-sm px-5 py-3 w-full shadow-sm'
          }`}
        >
          <div 
            className={isUser ? "whitespace-pre-wrap break-words" : "prose prose-slate prose-pre:bg-slate-100 prose-pre:border prose-pre:border-slate-200 prose-pre:text-slate-800 max-w-none break-words overflow-x-auto no-scrollbar"}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {message.parts?.map((p: any, i: number) => 
              p.type === 'image' && <img key={i} src={p.image} onClick={() => setZoomedImage(p.image)} className="max-w-md w-full rounded-xl mb-3 shadow-sm border border-gray-200/50 cursor-zoom-in hover:opacity-90 transition-opacity" alt="Attachment" />
            )}
            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
              {message.parts 
                ? message.parts.map((p: any) => (p.type === 'text' ? p.text : '')).join('')
                : ''}
            </ReactMarkdown>
          </div>
        </div>
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center ml-3 mt-1 shadow-sm shrink-0 border border-white/50">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
        )}
      </div>
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <img 
            src={zoomedImage} 
            alt="Maximized" 
            className="max-w-full max-h-full rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </>
  );