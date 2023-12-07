import {readFileAndFilter} from "../../util.js";
import _ from 'lodash';

const getNumberOfWinnersOnCard = (card, colonIndex) => {
    const [winningNumbers, yourNumbers] = card.slice(colonIndex + 1).trim().split(' | ').map(str =>
        _.chain(str.trim().split(" "))
            .filter(Boolean)
            .map(num => parseInt(num))
            .sort()
            .value()
    );
    return yourNumbers.reduce((a, c) => a + (winningNumbers.includes(c) ? 1 : 0), 0);

}

const partOne = file => {
    let pointsWon = 0;

    readFileAndFilter(file)
        .forEach(card => {
            const numOfWinners = getNumberOfWinnersOnCard(card, card.indexOf(':'));
            const delta = numOfWinners < 1 ? numOfWinners : Math.pow(2, numOfWinners - 1);
            pointsWon += delta;
        });

    return pointsWon;
};

const partTwo = file => {
    let numberOfCardsPlayed = 0;

    const cards = readFileAndFilter(file);
    const numberOfTotalCards = cards.length;

    const countingArr = new Array(numberOfTotalCards).fill(1);

    cards.forEach((card, index) => {
        const numOfWinners = getNumberOfWinnersOnCard(card, card.indexOf(':'));
        while (countingArr[index] > 0) {
            for (let i = 1; i <= numOfWinners; i++) {
                countingArr[index + i]++;
            }
            countingArr[index]--;
            numberOfCardsPlayed++;
        }
    });

    return numberOfCardsPlayed;
}

// console.log(partOne('input-sample.txt'));
// console.log(partOne('input.txt'));

// console.log(partTwo('input-sample.txt'));
// console.log(partTwo('input.txt'));