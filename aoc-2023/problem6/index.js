import {readMultiLinedFile} from "../../util.js";

const calculateWinners = (time, wins, distanceToBeat) => {
    const left = Math.floor((-time + Math.sqrt((time * time - 4 * distanceToBeat))) / 2);
    const right = Math.ceil((-time - Math.sqrt((time * time - 4 * distanceToBeat))) / 2);
    const winners = left - right + 1;
    return winners * wins;
}

const partOne = file => {
    const [times, distance] = readMultiLinedFile(file)
        .map(line => {
            const arr = line.replace(/ +/g, ' ').split(' ');
            arr.shift();
            return arr.map(str => parseInt(str));
        });

    return times.reduce((wins, time, index) => calculateWinners(time, wins, distance[index] + 1), 1)
};

const partTwo = file => {
    const [time, distanceToBeat] = readMultiLinedFile(file)
        .map(line => {
            const arr = line.replace(/ +/g, ' ').split(' ');
            arr.shift();
            return parseInt(arr.join(''));
        });

    return calculateWinners(time, 1, distanceToBeat + 1);
}


// console.log(partOne('input-sample.txt'));
// console.log(partOne('input.txt'));
//
// console.log(partTwo('input-sample.txt'));
// console.log(partTwo('input.txt'));
