const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());

io.on('connection', (socket) => {
    console.log('User conectado');

    socket.on('disconnect', () => {
        console.log('User se fue');
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` });
            //io.to(user.room).emit('roomSata', { room: user.room, users: getUsersInRoom(user.room) });
        }
    });

    socket.on('join', ({name, room}, callback) => {
        console.log('User ' + name + ' joined the room ' + room);
        const userJoined = {id: socket.id, name, room};
        const {error, user } = addUser(userJoined);
        const users = getUsersInRoom(room);
        if (error) {
            return callback(error);
        }

        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name}, has joined`});
        socket.join(user.room);

        //io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

        callback(users);
    });

    socket.on('sendMessage', (message, callback) => {
        console.log('**se manda mensaje ' + message);
        const user = getUser(socket.id);
        console.log(user);
        if (user) {
            console.log('***-emit message');
            io.to(user.room).emit('message', { user: user.name, text: message });
        }
        callback();
    });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));