import { Sudoku, generator } from '@forfuns/sudoku';
import { Cell } from '../models/Cell';
import { ColorIsReadonly } from '../models/ColorIsReadonly';
import { Color } from '../enums/ColorEnum';
import { Level } from '../enums/LevelEnum';

export function isGridRed(colorGrid: Array<Array<ColorIsReadonly>>): boolean {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (colorGrid[i][j].color === Color.Red) {
                return true;
            }
        }
    }
    return false;
}


export function GetValidGrid(sudokuGrid: Array<Array<Cell>>, answerGrid: Array<Array<Cell>>, isCompleted: boolean): Array<Array<ColorIsReadonly>> {
    const validColors = new Array<Array<ColorIsReadonly>>();

    for (let i: number = 0; i < sudokuGrid.length; i++) {
        validColors[i] = new Array<ColorIsReadonly>();

        for (let j: number = 0; j < sudokuGrid[i].length; j++) {
            validColors[i].push(new ColorIsReadonly(Color.White, false));
            if (sudokuGrid[i][j].isReadonly) {
                validColors[i][j].isReadonly = true;
                continue;
            }
            if (isCompleted) {
                const isValid = sudokuGrid[i][j].value === answerGrid[i][j].value;
                if (isValid) {
                    validColors[i][j].color = Color.Green;
                }
                else {
                    validColors[i][j].color = Color.Red;
                }
            }
        }
    }
    console.log('in valid grid');
    return validColors;
}

function MapFrom1DimTo2DimCells(numbers: number[]): Array<Array<Cell>> {
    let grid: Array<Array<Cell>> = new Array<Array<Cell>>();
    for (let row = 0; row < 9; row++) {
        let str: string = '';
        let rowArray: Array<Cell> = new Array<Cell>(9);
        for (let col = 0; col < 9; col++) {
            const index = row * 9 + col;
            const cellValue: number = numbers[index];
            str += `${cellValue} `;
            if (cellValue === -1) {
                rowArray[col] = new Cell(false, undefined);
            } else {
                rowArray[col] = new Cell(true, cellValue);
            }
        }
        console.log(str);
        grid[row] = rowArray;
    }
    return grid;
}

export function GetSudokuGridAndAnswer(level: Level): [Array<Array<Cell>>, Array<Array<Cell>>] {
    const puzzle = generator(level);
    const grid: Array<Array<Cell>> = MapFrom1DimTo2DimCells(puzzle);
    const sudoku = new Sudoku(puzzle, true);
    const answerGrid: Array<Array<Cell>> = MapFrom1DimTo2DimCells(sudoku.answer);
    return [grid, answerGrid]
}
