import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const games = {};

io.on('connection', async (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('create room', () => {

    });

    socket.on('join room', () => {

    });

    socket.on('move', (roomId, move) => {

    });


});

server.listen(4000, () => {
    console.log('listening on *:4000');
});