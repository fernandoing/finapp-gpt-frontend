import React, { useEffect, useRef } from 'react';

const Chat = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef(null);
  
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="overflow-y-auto flex-1 p-4 space-y-2">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`w-full flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`inline-block p-2 rounded-lg text-white ${msg.isUser ? 'bg-blue-500' : 'bg-gray-500'} break-words max-w-prose`}>
            {msg.text && msg.text.split('\n').map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="w-full flex justify-start animate-pulse">
          <div className="inline-block p-2 rounded-lg bg-gray-500">
            <span className="block h-2 bg-gray-300 rounded"></span>
          </div>
        </div>
      )}
      
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default Chat;