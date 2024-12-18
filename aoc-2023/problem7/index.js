import {readMultiLinedFile} from "../../util.js";
import _ from 'lodash';

const p1Cards = 'AKQJT98765432';
const p2Cards = 'AKQT98765432J';

const getKey = (cards) => {
    const key = {};
    cards
        .split('')
        .forEach((card, rank) => {
            key[card] = {frequency: 0, rank}
        });

    return key;
}

const getPartOneHandType = (gameKey) => {
    const frequencyArray = _.chain(Object.keys(gameKey))
        .filter(key => gameKey[key].frequency > 0)
        .map(key => gameKey[key].frequency)
        .value();

    // 5 of a kind
    if (frequencyArray.length === 1) {
        return 600;
    }

    // 4 of a kind
    if (frequencyArray.includes(4)) {
        return 500;
    }

    if (frequencyArray.includes(3)) {
        // Full house : 3 of a kind
        return frequencyArray.includes(2) ? 400 : 300;
    }

    if (frequencyArray.includes(2)) {
        // 2 Pair : 1 pair
        return frequencyArray.filter(freq => freq === 2).length === 2 ? 200 : 100;
    }

    // High card
    return 0;
}
const getPartTwoHandType = (gameKey) => {
    const frequencyArray = _.chain(Object.keys(gameKey))
        .filter(key => gameKey[key].frequency > 0)
        .map(key => gameKey[key].frequency)
        .value();

    const numberOfWilds = gameKey['J'].frequency;

    // 5 of a kind
    if (frequencyArray.length === 1 || (frequencyArray.includes(4) && numberOfWilds === 1) || (frequencyArray.includes(3) && numberOfWilds === 2)) {
        return 600;
    }

    // 4 of a kind
    if (frequencyArray.includes(4) || (frequencyArray.includes(3) && numberOfWilds === 1)) {
        return 500;
    }

    if (frequencyArray.includes(3)) {
        // Full house : 3 of a kind
        return frequencyArray.includes(2) ? 400 : 300;
    }

    if (frequencyArray.includes(2)) {
        // 2 Pair : 1 pair
        return frequencyArray.filter(freq => freq === 2).length === 2 ? 200 : 100;
    }

    // High card
    return 0;
}

const solve = (file, cards, fnHandRanker) => {
    const orderedHands = readMultiLinedFile(file)
        .map(line => {
            const [hand, bid] = line.split(' ');
            const gameKey = getKey(cards);
            const cardOrder = [];

            hand.split('').forEach(card => {
                gameKey[card].frequency++;
                cardOrder.push(gameKey[card].rank);
            });

            return {hand, cardOrder, handTypeStrength: fnHandRanker(gameKey), bid: Number(bid)};
        })
        .sort((a, b) => {

            if (a.handTypeStrength > b.handTypeStrength) {
                return 1;
            }

            if (a.handTypeStrength < b.handTypeStrength) {
                return -1;
            }

            const result = a.cardOrder.map((v, i) => b.cardOrder[i] - v);
            return result.find(diff => diff !== 0);
        });

    return orderedHands.reduce((a, c, i) => a + c.bid * (i + 1), 0);

};

const partTwo = file => {

}


// console.log(solve('input-sample.txt', p1Cards, getPartOneHandType));
// console.log(solve('input.txt', p1Cards, getPartOneHandType));
//
console.log(solve('input-sample.txt', p2Cards, getPartTwoHandType));
// console.log(solve('input.txt', p2Cards, getPartTwoHandType));
// console.log(partTwo('input.txt'));
