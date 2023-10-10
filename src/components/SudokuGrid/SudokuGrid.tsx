import React, { useEffect, useMemo, useState } from 'react';
import './SudokuGrid.css';
import { GetValidGrid, isGridRed } from '../../services/SudokuService';
import { useSudoku } from '../../contexts/SudokuContext';

function SudokuGrid() {
    const { sudokuGrid, answerGrid, isCompleted, setSudokuGrid, setIsCompleted } = useSudoku();
    // const [validGrid, setValidGrid] = useState(GetValidGrid(sudokuGrid, answerGrid, isCompleted));
    const [isRed, setIsRed] = useState<boolean>(false);
    const validGrid = useMemo(() => GetValidGrid(sudokuGrid, answerGrid, isCompleted), [isCompleted]);

    // useEffect(() => {
    //     setValidGrid(GetValidGrid(sudokuGrid, answerGrid, isCompleted));
    // }, [isCompleted]);

    useEffect(() => {
        setIsRed(isGridRed(validGrid));
    }, [validGrid])

    // Define an event handler for user input
    const handleCellChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        rowIndex: number,
        colIndex: number
    ) => {
        // Parse the input value as an integer
        const newValue = parseInt(event.target.value, 10) || undefined;
        sudokuGrid[rowIndex][colIndex] = { isReadonly: false, value: newValue };

        setSudokuGrid([...sudokuGrid]);

        const areAll = sudokuGrid.every(row => row.every(cell => cell.value !== undefined));
        setIsCompleted(areAll);
    };

    return (
        <>
            <div className='my-5 h-12 flex items-center justify-center flex-col'>
                {(!isRed && isCompleted) && <p className='my-1 text-green-700 font-semibold'>You have won the game</p>}
                {isCompleted && <p className='my-1 text-black-700 font-semibold'>You have completed the grid</p>}
            </div>
            <table className='sudoku-grid mx-auto'>
                <tbody>
                    {sudokuGrid.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td className="border border-black-700 w-10 h-10" key={colIndex}>
                                    <div className='w-full h-full flex justify-center items-center'>
                                        {cell.isReadonly ?
                                            <div className='text-center'>{cell.value}</div> : (
                                                <input className={`w-full h-full text-center focus:outline-none text-yellow-900 ${validGrid[rowIndex][colIndex].color}`}
                                                    type='text' value={cell.value ? cell.value : ''}
                                                    onChange={(event) => handleCellChange(event, rowIndex, colIndex)}
                                                    maxLength={1} />
                                            )}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default SudokuGrid;
