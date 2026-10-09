import { UIMessage } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';

export function Message({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] min-w-0 rounded-2xl px-4 py-3 overflow-x-auto ${
          isUser
            ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-50 rounded-br-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]'
            : 'bg-pink-500/10 border border-pink-500/50 text-zinc-100 rounded-bl-sm shadow-[0_0_15px_rgba(236,72,153,0.2)]'
        }`}
      >
        <div className={isUser ? "whitespace-pre-wrap break-words" : "prose prose-invert max-w-none break-words"}>
          {message.parts?.map((p: any, i: number) => 
            p.type === 'image' && <img key={i} src={p.image} className="max-w-full rounded-lg mb-2 border border-cyan-500/30" alt="Attachment" />
          )}
          <ReactMarkdown>
            {message.parts 
              ? message.parts.map((p) => (p.type === 'text' ? p.text : '')).join('')
              : ''}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
