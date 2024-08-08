import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { PlayerForm } from './components/PlayerForm';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connection', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connection', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div className='App'>
      <PlayerForm />
    </div>
  );
}

export default App;
