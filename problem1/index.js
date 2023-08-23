const fs = require('fs');
const FILEPATH = './problem1/input.txt'

const _read_input_file = () => fs.readFileSync(FILEPATH, 'utf8');

const what_floor = instructions => {
    let floor = 0;
    for(let direction of instructions){
        floor += (direction === "(" ? 1 : -1);
    }
    return floor;
}

console.log(`Ending floor is: ${what_floor(_read_input_file())}`)
