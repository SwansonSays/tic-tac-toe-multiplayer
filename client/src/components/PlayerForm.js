import React, { useState } from "react";
import { socket } from "../socket";

export function PlayerForm({ setName }) {
    const [value, setValue] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        if(value) {
            socket.emit('create game', (value));
            setName(value);
        }
        setValue('');
    }

    return (
        <form onSubmit={ handleSubmit }>
            <h1>Enter Player Name:</h1>
            <input id="input" value={ value } onChange={ e => setValue(e.target.value) } />
            <button type="submit">Search for Game</button>
        </form>
    );
}