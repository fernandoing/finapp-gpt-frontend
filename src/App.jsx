import { useEffect, useState } from 'react'
import './App.css'
import { getHistory, deleteHistory, sendMessage } from './services/chatService';
import Chat from './components/Chat';
import ChatInput from './components/ChatInput';
import logo from './assets/FinApp.png';
import { MdLogout } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';


function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const welcomeMessage = { text: "🌟 Welcome to your personal AI Financial Advisor!\n I'm here to help you with advice, budgeting, and tracking expenses. Just tell me what you need – whether it's creating a budget or getting financial tips.\n How can I assist you today?", isUser: false };
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  
  useEffect(() => {
    getHistory(token)
      .then(previousMessages => {
        setMessages(prevMessages => [...prevMessages, ...previousMessages]);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSendMessage = async (messageText) => {
    setMessages((currentMessages) => [
      ...currentMessages,
      { text: messageText, isUser: true },
    ]);
    setIsLoading(true);

    try {
      const { response } = await sendMessage(messageText, token);
      setMessages((currentMessages) => [
        ...currentMessages,
        { text: response, isUser: false },
      ]);
    } catch (error) {
      console.error("There was a problem with sending the message:", error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleClearMessages = () => {
    deleteHistory(token)
    .then(() => {
        setMessages([]);
        setMessages(messages => [...messages, welcomeMessage]);
      })
    .catch(error => console.error(error));
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
          <ChatInput onSendMessage={handleSendMessage} onClearMessages={handleClearMessages} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App
