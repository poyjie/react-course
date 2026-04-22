import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import './ChatMessageList.css';

function ChatMessageList({ chatMessages }) {

    const chatMessageRef = useRef(null);

    useEffect(() => {
        const containerElem = chatMessageRef.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <div className="chat-messages-container" ref={chatMessageRef}>
            {chatMessages.map((chatMessage) => (
                <ChatMessage key={chatMessage.id} message={chatMessage.message} sender={chatMessage.sender} />
            ))}
        </div>
    );
}

export default ChatMessageList;