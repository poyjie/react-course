    import robot from '../assets/robot.png';
    import user from '../assets/user.png';
    import './ChatMessage.css'

    function ChatMessage({ message, sender }) {
        return (
            <div className={
                sender === 'user' ?
                    'chat-user-message' :
                    'chat-bot-message'
            }>

                {sender === 'bot' && (
                    <img src={robot} width="50px" className="chat-profile-message" />
                )}
                <div className="chat-message">{message}</div>
                {sender === 'user' && <img src={user} className="chat-profile-message" />}
            </div>
        );
    }

    export default ChatMessage;