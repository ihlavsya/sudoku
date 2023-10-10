import React from 'react';
import './App.css';
import NewGameButton from '../NewGameButton/NewGameButton';
import SudokuGrid from '../SudokuGrid/SudokuGrid';
import { SudokuProvider } from '../../contexts/SudokuContext';
import LevelButtons from '../LevelButtons/LevelButtons';

function App() {
  return (
    <div className='w-1/2 mx-auto text-center'>
      <SudokuProvider>
        <br />
        <LevelButtons></LevelButtons>
        <SudokuGrid></SudokuGrid>
        <br />
        <NewGameButton></NewGameButton>
      </SudokuProvider>
    </div>
  );
}

export default App;
