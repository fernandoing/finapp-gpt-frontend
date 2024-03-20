import React, { useState, useEffect } from 'react';
import { MdSend, MdKeyboardVoice, MdMicOff, MdDelete } from 'react-icons/md'; // Importing icons

// This component represents the input field and buttons for sending messages and toggling voice input
const ChatInput = ({ onSendMessage, onClearMessages }) => {
  const [message, setMessage] = useState(''); // State for storing the input message
  const [listening, setListening] = useState(false); // State for tracking if voice input is active
  const [speechRecognition, setSpeechRecognition] = useState(null); // State for storing the SpeechRecognition object

  useEffect(() => {
    // Check if the browser supports SpeechRecognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition(); // Create a new instance of SpeechRecognition
      recognition.continuous = false; // Restart after capturing a phrase
      recognition.interimResults = false; // We don't need interim results
      recognition.lang = 'en-US'; // Set language to Spanish (Spain)
      recognition.onresult = (event) => {
        const last = event.results.length - 1; // Get the last part of the result
        const transcript = event.results[last][0].transcript.trim(); // Get the transcribed message
        onSendMessage(transcript); // Directly send the message
        setListening(false); // Stop listening
      };
      recognition.onend = () => {
        setListening(false); // Update listening state when voice input ends
      };
      setSpeechRecognition(recognition); // Store the SpeechRecognition object in state
    }
  }, [onSendMessage]);

  // Function to toggle voice input
  const toggleListening = () => {
    if (listening) {
      speechRecognition.stop(); // Stop voice input if already listening
    } else {
      speechRecognition.start(); // Start voice input if not listening
    }
    setListening(!listening); // Toggle the listening state
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Ignore empty messages
    onSendMessage(message); // Send the message
    setMessage(''); // Clear the input field
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4 items-center w-full">
      <button type="button" onClick={onClearMessages} className="bg-red-500 text-white rounded-lg p-2">
        <MdDelete /> {/* Using delete icon */}
      </button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 border rounded-lg"
        placeholder="Type your message here..."
      />
      <button type="submit" className="bg-blue-500 text-white rounded-lg p-2">
        <MdSend /> {/* Using send icon */}
      </button>
      {speechRecognition ? (
        <button
          type="button"
          onClick={toggleListening}
          className={`p-2 rounded-lg ${listening ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          {listening ? <MdMicOff /> : <MdKeyboardVoice />} {/* Toggle between voice icons */}
        </button>
      ) : (
        <p className="text-red-500">Voice input not supported</p>
      )}
    </form>
  );
};

export default ChatInput;