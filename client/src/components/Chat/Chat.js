import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

let socket;

const Chat = (props) => {
    const [name, setName] = useState(''); 
    const [room, setRoom] = useState(''); 
    const ENDPOINT = 'localhost:5000';
    useEffect(() => {
        const { room, name } = queryString.parse(props.location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {

        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, props.location.search]);

    return <h1>Yo from chat</h1>
}

export default Chat;