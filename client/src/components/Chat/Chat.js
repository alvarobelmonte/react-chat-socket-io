import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import Infobar from '../Infobar/Infobar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import OnlineUsers from '../OnlineUsers/OnlineUsers';

let socket;

export default function Chat({location}) {
    
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [onlineUsers, setUsers] = useState([]);
    const endpoint = 'https://react-chat-server-aba.herokuapp.com/';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);
        setName(name);
        setRoom(room);

        socket = io(endpoint);
        console.log(socket);
        socket.emit('join', {name, room}, (users) => {
            setUsers(users);
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        };
    }, [endpoint, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            console.log('Message recibido: ' + message);
            setMessages([...messages, message]);
            console.log('Array messages: ' + messages);
        });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
            console.log('Mensaje enviado: ' + message);
            console.log('message,messages', message, messages);
        }
    };

    

    return (
        <div className="outerContainer">
            <OnlineUsers users={onlineUsers} currentUser={name} room={room} />
            <div className="container">
                <Infobar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>

        </div>
    )
}
