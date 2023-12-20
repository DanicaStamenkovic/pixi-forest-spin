import { winningCombos } from "../constants/WinningCombos";
import { reelTypes } from "../main";

function checkIfComboIsWinnner(valueMatix: number[][], comboMatrix: number[][]) {
    let flagNumber: number[] = (new Array(4)).fill(0);

    //pass through the matrix 
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            //get only significant fields in each row
            flagNumber[i] += valueMatix[i][j] * comboMatrix[j][i]
        }
    }

    //check if elements are the same, if so we have a combo
    return Math.min(...flagNumber) === Math.max(...flagNumber)
}

export function findWinningPositions(reels:reelTypes[]) {
    let matrix: number[][] = []
    reels.forEach((reel) => {
        const symbolCopy = [...reel.symbols]
        symbolCopy.sort((a, b) => a.y - b.y)
        matrix.push(symbolCopy.map(symbol => symbol.renderId ?? 0))
    });

    //get only combos that are winners
    const winningPositions: number[][][] = winningCombos.reduce((acc, winningComboMatrix) => {
        return checkIfComboIsWinnner(matrix, winningComboMatrix)
        ? [...acc, [...winningComboMatrix]] : acc
    }, new Array())

    return winningPositions;
}