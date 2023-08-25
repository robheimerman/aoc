import {readSingleLinedFile} from "../util.js";
import _ from 'lodash';

const FILEPATH = './input.txt';

const numberOfHousesSantaVisited = directions => {
    let currentPosition = [0, 0];
    let destinations = {};
    _upsertDestination(destinations, currentPosition);

    for (let direction of directions) {
        const delta = _getDelta(direction)
        currentPosition[0] += delta[0];
        currentPosition[1] += delta[1];
        _upsertDestination(destinations, currentPosition);
    }
    return Object.keys(destinations).length;
}
const numberOfHousesSantaAndRoboVisited = directions => {
    let santasCurrentDestination = [0, 0];
    let santasDestinations = {};
    let roboCurrentDestination = [0, 0];
    let roboDestinations = {};
    _upsertDestination(santasDestinations, santasCurrentDestination);
    _upsertDestination(roboDestinations, santasCurrentDestination);

    for (let i = 0; i < directions.length; i++) {
        const direction = directions[i];
        const delta = _getDelta(direction)

        const whoDeliveredPresent = i % 2 === 0 ? santasDestinations : roboDestinations;
        const positionToUpdate = i % 2 === 0 ? santasCurrentDestination : roboCurrentDestination;
        positionToUpdate[0] += delta[0];
        positionToUpdate[1] += delta[1];
        _upsertDestination(whoDeliveredPresent, positionToUpdate);
    }
    let a = Object.keys(santasDestinations);
    let b = Object.keys(roboDestinations);
    const housesBothVisited = _.intersection(a, b);
    return a.length + b.length - housesBothVisited.length;
}


const _getDelta = direction => {
    if (direction === "^") {
        return [0, 1];
    }
    if (direction === ">") {
        return [1, 0];
    }
    if (direction === "v") {
        return [0, -1];
    }
    if (direction === "<") {
        return [-1, 0];
    }
    return undefined;
}
const _upsertDestination = (destinations, destinationToAdd) => {
    const key = destinationToAdd.join(",");
    destinations[key] = (destinations[key] || 0) + 1;
}

let inputFile = readSingleLinedFile(FILEPATH);
console.log(`Unique houses santa visited: ${numberOfHousesSantaVisited(inputFile)}`)
console.log(`Unique house santa and robo santa visited: ${numberOfHousesSantaAndRoboVisited(inputFile)}`)
