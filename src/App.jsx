import { useEffect, useState } from 'react'
import './App.css'
import Chat from './components/Chat';
import ChatInput from './components/ChatInput';
import logo from './assets/FinApp.png';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const welcomeMessage = { text: "🌟 Welcome to your personal AI Financial Advisor!\n I'm here to help you with advice, budgeting, and tracking expenses. Just tell me what you need – whether it's creating a budget or getting financial tips.\n How can I assist you today?", isUser: false };
  const [messages, setMessages] = useState([
    welcomeMessage
  ]);


  const handleSendMessage = async (messageText) => {
    // Add message to chat
    const newMessage = { text: messageText, isUser: true };
    setMessages(messages => [...messages, newMessage]);

    // POST request to Flask server
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/get_response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ user_input: messageText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Add GPT model's response to chat
      setMessages(messages => [...messages, { text: data.response, isUser: false }]);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleClearMessages = () => {
    setMessages([]); // Clear the messages state
    setMessages(messages => [...messages, welcomeMessage]);

  };

  return (
    <div className="App container mx-auto px-4 py-10 flex flex-col min-h-screen">
      <div className="logo-container flex items-center self-start mb-8">
        <img src={logo} alt="Logo" className="logo mr-4" /> {/* Adjust this line if needed */}
        <h1 className="text-xl font-bold">AI Finance Cloud</h1> {/* App name added here */}
      </div>
      <div className="flex flex-col flex-1 max-w-prose mx-auto">
        <Chat messages={messages} />
        <div className="mt-auto mb-0">
          <ChatInput onSendMessage={handleSendMessage} onClearMessages={handleClearMessages} />
        </div>
      </div>
    </div>
  );
}

export default App
