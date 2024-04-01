import { useEffect, useState } from 'react'
import './App.css'
import Chat from './components/Chat';
import ChatInput from './components/ChatInput';
import logo from './assets/FinApp.png';
import { MdLogout } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

async function fetchPreviousMessages(token) {
  const response = await fetch(`${API_URL}/chats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data.chats;
}

function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const welcomeMessage = { text: "🌟 Welcome to your personal AI Financial Advisor!\n I'm here to help you with advice, budgeting, and tracking expenses. Just tell me what you need – whether it's creating a budget or getting financial tips.\n How can I assist you today?", isUser: false };
  const [messages, setMessages] = useState([welcomeMessage]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchPreviousMessages(token)
      .then(previousMessages => {
        setMessages(prevMessages => [...prevMessages, ...previousMessages]);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSendMessage = async (messageText) => {
    const newMessage = { text: messageText, isUser: true };
    setMessages(messages => [...messages, newMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/message`, {
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

      setMessages(messages => [...messages, { text: data.response, isUser: false }]);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);

    } finally {
      setIsLoading(false); 
    }
  };

  const handleClearMessages = () => {
    setMessages([]); 
    setMessages(messages => [...messages, welcomeMessage]);

  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="App container mx-auto px-4 py-10 flex flex-col min-h-screen">
      <div className="flex items-center justify-between w-full mb-8">
        <Link to="/" className="flex items-center cursor-pointer">
          <img src={logo} alt="Logo" className="logo mr-4" />
          <h1 className="text-xl font-bold">AI Finance Cloud</h1>
        </Link>
        <Link to="/login" onClick={handleLogout}
          className="text-gray-300 hover:text-blue-400 flex items-center font-semibold transition-colors duration-200">
          <MdLogout className="mr-2 text-lg" /> Logout
        </Link>
      </div>

      <div className="flex flex-col flex-1 max-w-prose mx-auto">
        <Chat messages={messages} isLoading={isLoading} />
        <div className="mt-auto mb-0">
          <ChatInput onSendMessage={handleSendMessage} onClearMessages={handleClearMessages} isLoading={isLoading}/>
        </div>
      </div>
    </div>
  );
}

export default App
