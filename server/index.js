import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const names = [];
const rooms = [];

io.on('connection', async (socket) => {
    console.log('a user connected');
    const sockets = await io.fetchSockets();
    //console.log(sockets);
    console.log("sockets: " + socket.rooms);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('new player', (name) => {
        socket.data.username = name;
        names.push(name);
        console.log('Player registered with name: ' + name);
        //check for open rooms
        if(rooms > 0) {

        } else {
            socket.join(name.concat("-room"));
            console.log(socket.rooms);
            console.log("socket: " + socket.id + " username: " + socket.data.username + " Joined room: " + socket.id)
        }
        console.log(io.fetchSockets());
    });

    socket.on('start game', () => {
        console.log("startgame called");
    });
});

server.listen(4000, () => {
    console.log('listening on *:4000');
});