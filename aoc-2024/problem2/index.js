import {readInputFile} from "../../util.js";
import {dirname} from "path";
import {fileURLToPath} from "url";


function getDifferenceArray(arr) {
    const diffs = [];

    for (let i = 0; i < arr.length - 1; i++) {
        diffs.push(arr[i + 1] - arr[i]);
    }

    return diffs;
}

const parseFile = () => {
    const contents = readInputFile(dirname(fileURLToPath(import.meta.url)))
        .map((line) => line
            .split(' ')
            .map((num) => parseInt(num)));

    const differences = contents.map((arr) => getDifferenceArray(arr));
    return {differences, contents};
}

export const partOne = () => {
    const {differences} = parseFile();

    const safeLevels = differences
        .map((d) => {
            const num = d.find((v) => v !== 0);
            if (num < 0) {
                return d.every((diff) => diff < 0 && diff > -4);
            }
            return d.every((diff) => diff > 0 && diff < 4);
        })
        .filter((safe) => Boolean(safe) === true);
    return safeLevels.length;
}

const isSafeLevel = (diffArray, num) => {
    return (num < 0) ?
        diffArray.every((diff) => diff < 0 && diff > -4) :
        diffArray.every((diff) => diff > 0 && diff < 4);
}

export const partTwo = () => {
    const {differences, contents} = parseFile();
    console.log(contents.length);
    const safeLevels = differences
        .map((d, i) => {
            const num = d.find((v) => v !== 0);
            const isSafe = isSafeLevel(d, num);

            if (isSafe) {
                return isSafe;
            }
            const indexToRemove = d.findIndex((v) => {
                return num > 0 ? v <= 0 || v > 3 : v >= 0 || v < -3;
            });

            const duplicateLine = [...contents[i]]
            duplicateLine.splice(indexToRemove + 1, 1);

            const newLevel = getDifferenceArray(duplicateLine);

            return isSafeLevel(newLevel, num);
        })
        .filter((safe, i) => {
            let isSafe = Boolean(safe) === true;

            if(!isSafe && contents[i].length !== safe.length) {
                console.log(i, safe, contents[i], differences[i]);
            }
            return isSafe
        });

    return safeLevels.length;
}

