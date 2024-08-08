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

function startGame(roomId, socket) {
    io.to(roomId).emit('start game', games[roomId]);
}

io.on('connection', async (socket) => {
    console.log('a user connected. Id: ' + socket.id);

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];

        const index = rooms.indexOf(socket.id);
        if(index > -1) {
            rooms.splice(index, 1);
        }
        console.log(`Client ${socket.id} left rooms: ${rooms}`);

        //if other player is in room still make room open for searching
        //TODO if player disconnects while there is no room for them it crashes server
        if(rooms > 0 || games[rooms[0]].full === true) {
            openGame[rooms[0]].full = false;
            openGame.push(rooms[0]);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected. Id: ' + socket.id);
    });

    socket.on('create game', (name) => {
        if(openGame.length > 0){
            const roomId = openGame.shift(); //race condition?
            socket.join(roomId);
            games[roomId].player2name = name;
            games[roomId].player2Id = socket.id;
            games[roomId].full = true;
            console.log(`Player: ${name} Id: ${socket.id} joined Room: ${roomId}`);
            startGame(roomId, socket);
        } else {
            const roomId =uuidv4();

            games[roomId] = {
                board: Array(9).fill(null),
                xIsNext: true,
                player1Name: name,
                player1Id: socket.id,
                player2Name: null,
                player2Id: null,
                full: false,
                roomId: roomId,
            };
            socket.join(roomId);
            openGame.push(roomId);
            socket.emit('room created', roomId);
            console.log(`Room ${roomId} created with player: ${name} id: ${socket.id}`);
        }
    })

    socket.on('move', ({roomId, index}) => {
        console.log(JSON.stringify(games[roomId], null, 4));
        console.log(roomId);
        console.log(index);
        const game = games[roomId];
        console.log(`Client: ${socket.id} Clicked square: ${index} On Board: ${game.board}`)

        if(game.board[index]) {
            console.log("INVALID MOVE");
            //TODO alert user you cant make that move
            return;
        }

        const newBoard = game.board.slice();

        if(game.xIsNext) {
            newBoard[index] = "X";
        } else {
            newBoard[index] = "O";
        }
        //TODO check winner


        game.board = newBoard;
        game.xIsNext = !game.xIsNext;
        
        io.to(roomId).emit('update', game);
    });


});

server.listen(4000, () => {
    console.log('listening on *:4000');
});