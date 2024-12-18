import {readInputFile} from "../../util.js";
import {dirname} from "path";
import {fileURLToPath} from "url";


export const partOne = () => {
    let sum = 0;
    const leftArr = [], rightArr = []
    const contents = readInputFile(dirname(fileURLToPath(import.meta.url)));

    contents.forEach((line) => {
        const [left, right] = line.replace(/\s+/, ' ').split(' ');

        leftArr.push(parseInt(left));
        rightArr.push(parseInt(right));
    });

    leftArr.sort();
    rightArr.sort();

    rightArr.forEach((v, i) => {
       sum += Math.abs( v - leftArr[i]);
    });

    return sum;
}

export const partTwo = () => {
    let sum = 0;
    const leftArr = [];
    const frequencyDictionary = {};

    const contents = readInputFile(dirname(fileURLToPath(import.meta.url)));

    contents.forEach((line) => {
        const [left, right] = line.replace(/\s+/, ' ').split(' ');

        leftArr.push(parseInt(left));

        const key = parseInt(right);
        frequencyDictionary[key] = (frequencyDictionary[key] || 0) + 1;
    });

    leftArr.forEach((v) => {
        sum += v * (frequencyDictionary[v] || 0)
    });

    return sum;

}