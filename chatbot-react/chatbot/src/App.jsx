import { useState } from 'react'
import ChatInput from './components/ChatInput';
import ChatMessageList from './components/ChatMessageList';

import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState([
    // { message: 'test', sender: 'user', id: '1' },
    // { message: 'test', sender: 'bot', id: '2' }
  ]);
  return (
    <div className="app-container">
      <ChatMessageList
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}
export default App
