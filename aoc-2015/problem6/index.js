import {readMultiLinedFile} from "../util.js";

const FILEPATH = './input.txt';
const inputFile = readMultiLinedFile(FILEPATH);


const _initializeLights = (length, width) =>
    Array
        .from({length: length})
        .map(() =>
            Array.from({length: width}).fill(0));

const _followInstructions = (instructions, FUNCTIONS) => {
    let lights = _initializeLights(1000, 1000);
    instructions.forEach(instruction => {
        let instructionKey = instruction.split(/[0-9]/, 1);
        let fn = FUNCTIONS[instructionKey];
        let numbers = instruction
            .split(" ")
            .filter(str => str.match(/[0-9]/))
            .join()
            .split(',')
            .map(num => parseInt(num, 10));
        for (let i = numbers[0]; i < numbers[2] + 1; i++) {
            for (let j = numbers[1]; j < numbers[3] + 1; j++) {
                const state = lights[i][j];
                lights[i][j] = fn(state);
            }
        }
    });
    return lights;
}
const _sumTheLightValues = lights => lights.reduce((a, c) => a + c.reduce((a, c) => a + c, 0), 0);

const partOne = instructions => {
    const FUNCTIONS = {
        "turn on ": () => 1,
        "turn off ": () => 0,
        "toggle ": state => (state + 1) % 2
    }

    const lights = _followInstructions(instructions, FUNCTIONS);
    return _sumTheLightValues(lights);
}

const partTwo = instructions => {
    const FUNCTIONS = {
        "turn on ": state => state + 1,
        "turn off ": state => Math.max(0, state - 1),
        "toggle ": state => (state + 2)
    }

    const lights = _followInstructions(instructions, FUNCTIONS);

    return _sumTheLightValues(lights);
}


console.log(`Part one solution: ${partOne(inputFile)}`);
console.log(`Part two solution: ${partTwo(inputFile)}`);


