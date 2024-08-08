import React, { useState } from "react";
import { socket } from "../socket";

export function PlayerForm() {
    const [name, setName] = useState('');

    function onSubmit(event) {
        event.preventDefault();
        if(name) {
            socket.emit('new player', name);
        }
        setName('');
    }

    return (
        <form onSubmit={ onSubmit }>
            <h1>Enter Player Name:</h1>
            <input id="input" value={ name } onChange={ e => setName(e.target.value) } />
            <button type="submit">Search for Game</button>
        </form>
    );
}