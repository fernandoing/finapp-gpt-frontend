import React, { useEffect, useRef } from 'react';

const Chat = ({ messages }) => {
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
            {/* Split the message by newlines and map each line to a paragraph or a span followed by a <br /> */}
            {msg.text.split('\n').map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default Chat;