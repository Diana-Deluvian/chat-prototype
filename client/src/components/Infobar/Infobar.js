import React from 'react';
import './Infobar.css';
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

const Infobar = (props) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon}></img>
            <h3>{props.room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={closeIcon}></img></a>
        </div>
        
    </div>
)

export default Infobar;