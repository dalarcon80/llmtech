
import "../App.css"

const ChatMessage = ({ message }) => {
    return (
        <>
            <div className='chat-log'>
                <div className={`chat-message ${message.user === "genAI" && "genaichat"}`}>
                    <div className='chat-message-center'>
                        <div className={`avatar ${message.user === "genAI" && "genaichat"}`}>
                        </div>



                        {message.loadingMsn === 3 ? (

                            <div className="message">
                                {message.message}
                            </div>
                        ) : message.loadingMsn === 2 ? (
                            <div className="message">
                                {message.message}
                            </div>
                        ) : (
                            <div className="message">
                                {message.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChatMessage