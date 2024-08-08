import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { PlayerForm } from './components/PlayerForm';

function App() {
  

  useEffect(() => {
    socket.on('room created', (roomId, game) => {

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
      <PlayerForm />
    </div>
  );
}

export default App;
