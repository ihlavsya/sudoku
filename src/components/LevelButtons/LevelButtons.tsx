import React from 'react';
import { useSudoku } from '../../contexts/SudokuContext';
import { Level, LevelValues } from '../../enums/LevelEnum';
import './LevelButtons.css';

function LevelButtons() {
    const { currentLevel, changeLevel } = useSudoku();
    const handleLevelClick = (level: Level) => {
        changeLevel(level);
    };

    return (
        <div className="inline-flex h-14 bg-gradient-to-r from-white to-green-500">
            {Object.values(LevelValues).map((level, index) =>
                <button key={index} onClick={() => handleLevelClick(level.value)}
                    className={`${currentLevel === level.value ? 'bg-green-600' : 'bg-transparent'} hover:bg-green-600 text-green-800 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent`}>
                    {level.description}
                </button>
            )}
        </div>
    );
}

export default LevelButtons;
