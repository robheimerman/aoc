import {readFileAndFilter} from "../../util.js";

const isDigit = chr => /[0-9]/.test((chr || 'a'));
const isSymbol = chr => /[^0-9.]/.test((chr || 'a'));
const getSurroudingNumbers = (schematics, rowIndex, i) => {
    const deltas = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const adjacentNumbers = [];
    deltas
        .map(delta => [rowIndex + delta[0], i + delta[1]])
        .forEach(pos => {
            const chr = (schematics[pos[0]] || [])[pos[1]];
            if (isDigit(chr)) {
                adjacentNumbers.push(getPartNumber(schematics, pos));
            }
        });
    return adjacentNumbers;
}

const partOneLambda = (arr, adjacentNumbers) => {
    arr.push(...adjacentNumbers);
}
const partTwoLambda = (arr, adjacentNumbers, symbol) => {
    if(symbol === '*' && adjacentNumbers.length === 2) {
        arr.push(adjacentNumbers[0] * adjacentNumbers[1])
    }
}

const getPartNumber = (schematics, [y, x]) => {
    let number = '';
    let pos = x;

    while (isDigit(schematics[y][pos])) {
        pos -= 1;
    }

    // pos will end up one too small
    pos += 1;

    while (isDigit(schematics[y][pos])) {
        number += schematics[y][pos];
        schematics[y][pos] = 'a'; // Prevent counting numbers twice
        pos += 1;
    }

    return Number(number);
};
export const solve = (file, fnToApplyToAdjacentNumbers) => {
    const schematics = readFileAndFilter(file)
        .map(line => line.split(''));
    const nums = [];

    schematics.forEach((row, rowIndex) => {
        for (let i = 0; i < row.length; i++) {
            if (isSymbol(row[i])) {
                // Check adjacent cells for number
                const adjacentNumbers = getSurroudingNumbers(schematics, rowIndex, i);
                fnToApplyToAdjacentNumbers(nums, adjacentNumbers, row[i]);
            }
        }
    });
    return nums.reduce((a, c) => a + c, 0);
}

// console.log(solve('./input.txt', partOneLambda));
console.log(solve('./input.txt', partTwoLambda));
