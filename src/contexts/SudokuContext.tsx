// SudokuContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Level } from '../enums/LevelEnum';
import { GetSudokuGridAndAnswer } from '../services/SudokuService';
import { Cell } from '../models/Cell';
import useStorage from '../custom-hooks/useStorage';

interface SudokuContextValue {
  sudokuGrid: Array<Array<Cell>>;
  answerGrid: Array<Array<Cell>>;
  isCompleted: boolean;
  currentLevel: Level;
  setSudokuGrid: (grid: Array<Array<Cell>>) => void;
  setAnswerGrid: (grid: Array<Array<Cell>>) => void;
  setIsCompleted: (isCompleted: boolean) => void;
  changeLevel: (level: number) => void;
  newGame: () => void;
}

const SudokuContext = createContext<SudokuContextValue | undefined>(undefined);

export function SudokuProvider({ children }: { children: React.ReactNode }) {
  const [sudokuGrid, setSudokuGrid] = useStorage<Array<Array<Cell>>>(
    'sudokuGrid',
    null,
    localStorage
  );
  const [answerGrid, setAnswerGrid] = useStorage<Array<Array<Cell>>>(
    'answerGrid',
    null,
    localStorage
  );

  const [isCompleted, setIsCompleted] = useStorage<boolean>(
    'isCompleted',
    false,
    localStorage
  );

  const [currentLevel, setLevel] = useStorage<Level>(
    'level',
    Level.Easy,
    localStorage
  );

  if (!sudokuGrid || !answerGrid) {
    const [newSudokuGrid, newAnswerGrid] = GetSudokuGridAndAnswer(currentLevel);
    setSudokuGrid(newSudokuGrid);
    setAnswerGrid(newAnswerGrid);
  }

  const changeLevel = (level: number) => {
    const chosenLevel: Level = level;
    if (level != currentLevel) {
      setLevel(chosenLevel);
      newGame();
    }
  }

  const newGame = () => {
    const [newSudokuGrid, newAnswerGrid] = GetSudokuGridAndAnswer(currentLevel);
    setSudokuGrid(newSudokuGrid);
    setAnswerGrid(newAnswerGrid);
    setIsCompleted(false);
  };

  const contextValue: SudokuContextValue = {
    sudokuGrid: sudokuGrid!,
    answerGrid: answerGrid!,
    isCompleted: isCompleted,
    currentLevel,
    setSudokuGrid,
    setAnswerGrid,
    setIsCompleted,
    changeLevel,
    newGame,
  };

  return (
    <SudokuContext.Provider value={contextValue}>{children}</SudokuContext.Provider>
  );
}

export function useSudoku() {
  const context = useContext(SudokuContext);
  if (context === undefined) {
    throw new Error('useSudoku must be used within a SudokuProvider');
  }
  return context;
}
