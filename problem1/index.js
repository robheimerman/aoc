const fs = require('fs');
const FILEPATH = './problem1/input.txt'

const _readInputFile = () => fs.readFileSync(FILEPATH, 'utf8');

const whatFloor = instructions => {
    let floor = 0;
    for(let direction of instructions){
        floor += (direction === "(" ? 1 : -1);
    }
    return floor;
}

const whenDoesHeEnterBasement = instructions => {
    let floor = 0;
    let position = 1;

    while(floor >= 0 && position < instructions.length + 1){
        let direction = instructions.charAt(position - 1);
        floor += (direction === "(" ? 1 : -1);
        position ++;
    }
    return position - 1;
}

let inputFile = _readInputFile();
console.log(`Ending floor is: ${whatFloor(inputFile)}`)
console.log(`Enters basement at position: ${whenDoesHeEnterBasement(inputFile)}`)
