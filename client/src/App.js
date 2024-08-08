import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { PlayerForm } from './components/PlayerForm';
import { Board } from './components/Board';

function App() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [inGame, setInGame] = useState(false);
  const [game, setGame] = useState({});
  const [board, setBoard] = useState(Array(9).fill(null));

  useEffect(() => {
    socket.on('room created', (roomId) => {
      console.log(`Server created room ${roomId} for client ${socket.id}`);
      setRoomId(roomId);
      setInGame(true);
      //TODO redirect to game page
    });

    socket.on('start game', (game) => {
      console.log("In Start Game In APP");
      console.log(JSON.stringify(game, null, 4));
      setRoomId(game.roomId);
      setInGame(true);
      setGame(game);
      //TODO Render game
    });

    socket.on('update', (game) => {
      setBoard(game.board);
      //TODO show players who's turn it is
    });

    socket.on('error', (error) => {

    });

    return () => {
      socket.off('room created');
      socket.off('start game');
      socket.off('update');
      socket.off('error');
    };
  }, []);

  function handleSquareClick(index) {
    console.log(`Clicked index: ${index}`);
    socket.emit('move', ({roomId, index}));
  }

  return (
    <div className='App'>
      <PlayerForm setName={ setName } />
      <Board squares={board} onSquareClick={handleSquareClick}/>
    </div>
  );
}

export default App;
