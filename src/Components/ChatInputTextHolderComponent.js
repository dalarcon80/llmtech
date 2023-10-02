import { Component } from "react";
import '../App.css'

const ChatInputHolder = (handleSubmit,input, handleFileSelected,handleFileChange, fileInputRef,setInput) => {
    return (
        <div
            className='chat-input-textholder'>
            <form onSubmit={handleSubmit}>

                <input
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className='chat-input-textarea'
                    placeholder='Type your message here'>
                </input>

                <span className='buttonUpload' onClick={handleFileSelected}><img src={require(`../img/upload.png`)} /></span>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
            </form>
        </div>

    )
}

export default ChatInputHolder