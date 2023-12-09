import {readMultiLinedFile} from "../../util.js";

const partOne = file => {
    const [times, distance] = readMultiLinedFile(file)
        .map(line => {
            const arr = line.replace(/ +/g, ' ').split(' ');
            arr.shift();
            return arr.map(str => parseInt(str));
        });


    return times.reduce((wins, time, index) => {
        const distanceToBeat = distance[index];

        const winners = new Array(time)
            .fill(0)
            .filter((v, acc) => {
                let distance = (time - acc) * acc;
                return distance > distanceToBeat
            });

        return winners.length > 0 ? winners.length * wins : wins;
    }, 1)
};

const partTwo = file => {
    const [time, distanceToBeat] = readMultiLinedFile(file)
        .map(line => {
            const arr = line.replace(/ +/g, ' ').split(' ');
            arr.shift();
            return parseInt(arr.join(''));
        });

    const numWinners = new Array(time)
        .fill(0)
        .filter((v, acc) => {
            let distance = (time - acc) * acc;
            return distance > distanceToBeat
        });

    return numWinners.length;
}

// 21039729

// console.log(partOne('input-sample.txt'));
// console.log(partOne('input.txt'));

// console.log(partTwo('input-sample.txt'));
const start = new Date().valueOf();

console.log(partTwo('input.txt'));

console.log(`Time taken: ${new Date().valueOf() - start}`);