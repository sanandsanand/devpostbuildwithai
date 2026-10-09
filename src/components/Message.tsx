import { UIMessage } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';

export function Message({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] min-w-0 px-4 py-3 overflow-x-auto ${
          isUser
            ? 'bg-green-900/20 border border-green-500 text-green-500'
            : 'bg-black border border-green-500/50 text-green-500'
        }`}
      >
        <div className={isUser ? "whitespace-pre-wrap break-words" : "prose max-w-none break-words text-green-500 [&_*]:text-green-500"}>
          {message.parts?.map((p: any, i: number) => 
            p.type === 'image' && <img key={i} src={p.image} className="max-w-full rounded-none mb-2 border border-green-500/50" alt="Attachment" />
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
