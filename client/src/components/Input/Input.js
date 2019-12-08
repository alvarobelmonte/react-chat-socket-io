import React from 'react';
import './Input.css';

export default function Input({message, setMessage, sendMessage}) {
    return (
        <form className="form">
            <input value={message} onChange={(e) => setMessage(e.target.value)} 
                   onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : ''} 
                   type="text" className="input" placeholder="Message..." />
            <button className="sendButton" onClick={(e) => sendMessage(e)}>Send</button>
        </form>
    )
}
