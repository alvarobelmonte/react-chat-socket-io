import React from 'react'
import './OnlineUsers.css';
import Infobar from '../Infobar/Infobar';

export default function OnlineUsers({ users, currentUser, room }) {
    return (
        <div className="containerUsers">
            <Infobar />
            <main>
                { users ? users.map((user, i) => (user.name !== currentUser) ? <div key={i} >{user.name}</div> : '' ) : '' }
            </main>
        </div>
    )
}
