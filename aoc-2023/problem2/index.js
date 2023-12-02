import {readFileAndFilter} from "../../util.js";
import _ from 'lodash';

const parseLine = line => {
    const [id, gameString] = line.replace(/Game ([0-9]*):(.*)/, '$1XYZ$2').split('XYZ');

    const games = gameString.split(';')
        .map(str => {
            let split = str.split(' ').filter(arr => arr.length > 0);
            return _.chain(split)
                .chunk(2)
                .map(game => {
                    const obj = {};
                    const color = game[1].replace(',', '');
                    obj[color] = parseInt(game[0]);
                    return obj;
                })
                .value()
        });

    return {id, games};
}
const partOne = () => {
    const LIMITS = {'red': 12, 'green': 13, 'blue': 14};
    let total = 0;

    const isValidHandful = (obj) => {
        const color = Object.keys(obj)[0];
        const value = obj[color];
        let b = value <= LIMITS[color];
        return b;
    }

    readFileAndFilter('./input-p1.txt')
        .map(line => parseLine(line))
        .forEach(game => {
            if (game.games.every(gameObj => gameObj.every(obj => isValidHandful(obj)))) {
                total += parseInt(game.id);
            }
        });

    return total;
}

console.log(partOne());
// console.log(partTwo());