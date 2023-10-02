import { Component } from "react";
import '../App.css'
import Loader from "./Loader";
import ChatMessage from './ChatMessage';
import ChatMessageCardViewFiles from "./ChatMessageCardViewFiles";
const ReciclerViewFiles = ({FileName}) => {
    return (
        <div className='chatContainer'>
            {
                FileName.map((file,index)=>(
                    <ChatMessageCardViewFiles key={index} fileName = {file.name} urlFile = {file.downloadUrl} />
                ))
            }
        </div>
    )
}

export default ReciclerViewFiles