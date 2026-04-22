import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';

function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = useState('');

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    function sendMessage() {
        const newChatMessage = [
            ...chatMessages,
            { message: inputText, sender: 'user', id: crypto.randomUUID() },
        ];

        setChatMessages(newChatMessage);
        const loadingId = crypto.randomUUID();
        const response = Chatbot.getResponse(inputText);

        setChatMessages([
            ...newChatMessage,
            { message: 'Loading..', sender: 'bot', id: loadingId },
        ]);

        setTimeout(() => {
            setChatMessages(prevMessages =>
                prevMessages.map(msg =>
                    msg.id === loadingId
                        ? { ...msg, message: response }
                        : msg
                )
            );
        }, 1000);
        setInputText('');
    }

    return (
        <div className="chat-input-container">
            <input
                placeholder="Send a message"
                size="50"
                onChange={saveInputText}
                value={inputText}
                className="chat-input"
            />
            <button onClick={sendMessage} className="send-button">Send</button>
        </div>
    );
}

export default ChatInput;