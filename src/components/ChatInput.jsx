import React, { useState, useEffect, useRef } from 'react';
import { MdSend, MdKeyboardVoice, MdMicOff, MdDelete } from 'react-icons/md';

const ChatInput = ({ onSendMessage, onClearMessages, isLoading }) => {
  const [message, setMessage] = useState('');
  const [listening, setListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.onresult = (event) => {
        const last = event.results.length - 1;
        const transcript = event.results[last][0].transcript.trim();
        onSendMessage(transcript);
        setListening(false);
      };
      recognition.onend = () => setListening(false);
      setSpeechRecognition(recognition);
    }
  }, [onSendMessage]);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const toggleListening = () => {
    if (listening) {
      speechRecognition.stop();
    } else {
      speechRecognition.start();
    }
    setListening(!listening);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage('');
  };

  const disabledClass = isLoading ? "opacity-50 cursor-not-allowed" : "";
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4 items-center w-full">
      <button
        type="button"
        onClick={onClearMessages}
        className={`bg-red-500 text-white rounded-lg p-2 ${disabledClass}`}
        disabled={isLoading}
      >
        <MdDelete />
      </button>
      <input
        ref={inputRef}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`flex-1 p-2 border rounded-lg ${disabledClass}`}
        placeholder="Type your message here..."
        disabled={isLoading}
      />
      <button
        type="submit"
        className={`bg-blue-500 text-white rounded-lg p-2 ${disabledClass}`}
        disabled={isLoading}
      >
        <MdSend />
      </button>
      {speechRecognition ? (
        <button
          type="button"
          onClick={toggleListening}
          className={`p-2 rounded-lg ${listening ? 'bg-red-500' : 'bg-green-500'} text-white ${disabledClass}`}
          disabled={isLoading}
        >
          {listening ? <MdMicOff /> : <MdKeyboardVoice />}
        </button>
      ) : (
        <p className="text-red-500">Voice input not supported</p>
      )}
    </form>
  );
};

export default ChatInput;