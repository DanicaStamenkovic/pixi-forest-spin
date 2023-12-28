import { Reel } from "../../types";
import { winningCombos } from "../constants/WinningCombos";
import * as PIXI from 'pixi.js';

function checkIfComboIsWinnner(valueMatix: PIXI.Sprite[][], comboMatrix: number[][]) {
    let flagNumber: number[] = (new Array(4)).fill(0);
    let returnSymbols: PIXI.Sprite[] = [];
    //pass through the matrix 
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {

            //get only significant symbols in each row
            const renderID = valueMatix[i][j].renderId ?? 0
            flagNumber[i] += renderID * comboMatrix[j][i]
            if(comboMatrix[j][i] === 1) {
                returnSymbols.push(valueMatix[i][j])
            }
        }
    }

    //check if elements are the same, if so we have a combo
    return Math.min(...flagNumber) === Math.max(...flagNumber) ? returnSymbols.reverse() : []
}

export function findWinningPositions(reels:Reel[]) {
    //define empty matrix array
    let matrix: PIXI.Sprite[][] = [] 

    //go through the reels, make a copy of reel symbols and sort them because they set random symbols when tweening
    reels.forEach((reel) => matrix.push([...reel.symbols].sort((a, b) => a.y - b.y)));

    //get only combos that are winners
    const winningPositions: PIXI.Sprite[][] = winningCombos.reduce((acc, winningComboMatrix) => {
        const result = checkIfComboIsWinnner(matrix, winningComboMatrix)
            return result.length === 0 ? acc : [...acc, [...result]]
    }, new Array())

    return winningPositions;
}