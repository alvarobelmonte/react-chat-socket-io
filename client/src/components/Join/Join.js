import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './Join.css';

export default function Join() {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    
    const changeName = (event) => {
        setName(event.target.value);
    };

    const changeRoom = (event) => {
        setRoom(event.target.value);
    };

    const onClick = (event) => {
        if(!name || !room) {
            event.preventDefault();
        }
    };

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input placeholder="Name..." className="joinInput" type="text" onChange={changeName} />
                </div>
                <div>
                    <input placeholder="Room..." className="joinInput mt-20" type="text" onChange={changeRoom} />
                </div>
                <Link onClick={onClick} to={`/chat?name=${name}&room=${room}`}>
                    <button type="submit" className="button mt-20">Sign in</button>
                </Link>
            </div>
            
        </div>
    )
}
