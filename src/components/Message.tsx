import { UIMessage } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';

export function Message({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div
        className={`max-w-[85%] min-w-0 overflow-x-auto ${
          isUser
            ? 'bg-[#f4f4f4] text-gray-900 rounded-3xl px-5 py-3'
            : 'bg-transparent text-gray-900 px-2 py-2'
        }`}
      >
        <div className={isUser ? "whitespace-pre-wrap break-words" : "prose prose-gray max-w-none break-words"}>
          {message.parts?.map((p: any, i: number) => 
            p.type === 'image' && <img key={i} src={p.image} className="max-w-md rounded-xl mb-3 shadow-sm border border-gray-100" alt="Attachment" />
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
