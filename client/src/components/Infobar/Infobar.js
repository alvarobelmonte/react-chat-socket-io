import React from 'react';
import './Infobar.css';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

export default function Infobar({room}) {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img src={onlineIcon} className="onlineIcon" alt="icon"/>
                {room ? <h3>{room}</h3> : <span>Online Users</span>}
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="close"/></a>
            </div>
        </div>
    )
}
