const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./user');



const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server,{
    cors:{
        origin:'*',
    }
});

app.use(cors());

io.on('connection', (socket) => {
    console.log("We have a new connection", socket);

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id:socket.id, name, room });

        if(error) callback(error)
        
        socket.emit('message', {user: 'admin', text:`Welcome to the room, ${user.name}`});
        socket.broadcast.to(user.room).emit('message',{user: 'admin', text:`${user.name} joined room ${user.room}`});

        socket.join(user.room);

        callback();
        }
    );

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user: user.name, text: message});

        callback();
    })
    socket.on('disconnect', () => {
        console.log("User has left");
    })
});

app.use(router);


server.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));