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
      //redirect to game page
    });

    socket.on('start game', (game) => {
      setGame(game);
      //Render game
    });

    socket.on('update', (game) => {
      setBoard(game.board);
    });

    socket.on('error', (error) => {

    });

    return () => {
      socket.off('room created');
      socket.off('update');
      socket.off('error');
    };
  }, []);

  function handleSquareClick(index) {
    console.log(`Clicked index: ${index}`);
    //const newBoard = board.slice();
    //newBoard[index] = "X";
    //setBoard(newBoard);

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
