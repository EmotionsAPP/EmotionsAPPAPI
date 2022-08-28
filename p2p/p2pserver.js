const express =  require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

const rooms = {};

io.on('connection', socket => {
    socket.on('join room', roomID => {
        console.log(roomID, socket.id);

        if(rooms[roomID] && rooms[roomID].length < 2)
            rooms[roomID].push(socket.id)
        else
            rooms[roomID] = [socket.id]

        const otherUser = rooms[roomID].find(id => id !== socket.id);
        if(otherUser){
            socket.emit('other user', otherUser);
            socket.to(otherUser).emit('user joined', socket.id);
        }
    });

    socket.on('offer', payload => {
        io.to(payload.target).emit('offer', payload);
    });

    socket.on('answer', payload => {
        io.to(payload.target).emit('answer', payload);
    });

    socket.on('ice-candidate', incoming => {
        io.to(incoming.target).emit('ice-candidate', incoming.candidate);
    });

    socket.on('request audio call', payload => {
        io.to(payload.target).emit('request audio call', payload);
    });

    socket.on('accept audio call', payload => {
        io.to(payload.target).emit('accept audio call', payload);
    });

    socket.on('reject audio call', payload => {
        io.to(payload.target).emit('reject audio call', payload);
    });
});

server.listen(9000, () => console.log('WS Server running on port 9000'))

