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
const openGame = [];

io.on('connection', async (socket) => {
    console.log('a user connected. Id: ' + socket.id);

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];

        const index = rooms.indexOf(socket.id);
        if(index > -1) {
            rooms.splice(index, 1);
        }
        console.log(`Client ${socket.id} left rooms: ${rooms}`);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected. Id: ' + socket.id);
    });

    socket.on('create game', (name) => {
        if(openGame.length > 0){
            const roomId = openGame.shift(); //race condition?
            socket.join(roomId);
            games[roomId].player2 = name;
            console.log(`Player: ${name} Id: ${socket.id} joined Room: ${roomId}`);
            //startGame()?
        } else {
            const roomId =uuidv4();

            games[roomId] = {
                board: Array(9).fill(null),
                isXNext: true,
                player1Name: name,
                player1Id: socket.id,
                player2Name: null,
                player2Id: null,
            };
            socket.join(roomId);
            openGame.push(roomId);
            socket.emit('room created', roomId);
            console.log(`Room ${roomId} created with player: ${name} id: ${socket.id}`);
        }
    })

    socket.on('move', ({roomId, move}) => {

    });


});

server.listen(4000, () => {
    console.log('listening on *:4000');
});