import { Component } from "react";
import '../App.css'
import Loader from "./Loader";
import ChatMessage from './ChatMessage';

const ReciclerViewChat = ({loading, chatlog}) => {
    return (
        <div className='chatContainer'>
            {
                chatlog.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                ))

            }{
                loading && <Loader />
            }
        </div>
    )
}

export default ReciclerViewChat