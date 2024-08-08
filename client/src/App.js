import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { PlayerForm } from './components/PlayerForm';

function App() {
  const [name, setName] = useState("")

  useEffect(() => {
    socket.on('room created', (roomId) => {
      console.log(`Server created room ${roomId} for client ${socket.id}`);
      //redirect to game page
    });

    socket.on('update', (game) => {

    });

    socket.on('error', (error) => {

    });

    return () => {
      socket.off('room created');
      socket.off('update');
      socket.off('error');
    };
  }, []);


  return (
    <div className='App'>
      <PlayerForm setName={ setName }/>
    </div>
  );
}

export default App;
