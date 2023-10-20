import React from 'react';
import { useSudoku } from '../../contexts/SudokuContext';

function NewGameButton() {
    const { newGame } = useSudoku();
    return (
        <>
            <button onClick={newGame} className='bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'>New Game</button>
        </>
    );
}

export default NewGameButton;
