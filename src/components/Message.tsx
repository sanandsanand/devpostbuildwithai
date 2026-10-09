import { UIMessage } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';

export function Message({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-8 group`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-3 mt-1 shadow-sm shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
        </div>
      )}
      <div
        className={`min-w-0 ${
          isUser
            ? 'bg-white/80 backdrop-blur-md border border-white/50 text-gray-900 rounded-3xl rounded-tr-sm px-5 py-3 max-w-[85%] shadow-sm'
            : 'bg-white/40 backdrop-blur-md border border-white/30 text-gray-900 rounded-3xl rounded-tl-sm px-5 py-3 w-full shadow-sm'
        }`}
      >
        <div 
          className={isUser ? "whitespace-pre-wrap break-words" : "prose prose-gray prose-pre:bg-gray-800 prose-pre:text-gray-100 max-w-none break-words overflow-x-auto no-scrollbar"}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
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
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-3 mt-1 shadow-sm shrink-0 border border-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </div>
      )}
    </div>
  );
}
