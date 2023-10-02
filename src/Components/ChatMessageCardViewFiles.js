
import "../App.css"
import { Link } from "react-router-dom";
const ChatMessageCardViewFiles = ({ fileName, urlFile }) => {
    return (
        <>
            <div className='chat-log'>
                <div className={`chat-message "genaichat" `}>
                    <div className='chat-message-center'>
                        <div className={`avatar "genaichat"`}>
                        </div>
                        <div className="message">
                        <a href={urlFile}>
                        {
                            fileName     
                        } </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChatMessageCardViewFiles