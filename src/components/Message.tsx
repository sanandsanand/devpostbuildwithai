import { UIMessage } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';

export function Message({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] min-w-0 px-5 py-4 overflow-x-auto backdrop-blur-md shadow-sm ${
          isUser
            ? 'bg-white/70 border border-white/60 text-slate-900 rounded-3xl rounded-br-sm'
            : 'bg-white/50 border border-white/40 text-slate-800 rounded-3xl rounded-bl-sm'
        }`}
      >
        <div className={isUser ? "whitespace-pre-wrap break-words" : "prose max-w-none break-words text-slate-800 [&_*]:text-slate-800"}>
          {message.parts?.map((p: any, i: number) => 
            p.type === 'image' && <img key={i} src={p.image} className="max-w-full rounded-xl mb-3 border border-white/50 shadow-sm" alt="Attachment" />
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
