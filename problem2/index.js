const fs = require('fs');
const FILEPATH = './problem2/input.txt'

const _readInputFile = () =>
    fs.readFileSync(FILEPATH, 'utf8')
        .split('\n')
        .map(dimensions =>
            dimensions
                .split("x")
                .map(d => parseInt(d))
                .sort((a, b) => a - b));

const _requiredWrappingPaperForPresent = dimensions => {
    let l = dimensions[0];
    let w = dimensions[1];
    let h = dimensions[2];
    return 3 * l * w + 2 * w * h + 2 * h * l;
}

const _requiredRibbonForPresent = dimensions => {
    let l = dimensions[0];
    let w = dimensions[1];
    let h = dimensions[2];
    return 2 * (l + w) + l * w * h
}


const totalWrappingPaperRequired = dimensions => dimensions.reduce((a, c) => a + _requiredWrappingPaperForPresent(c), 0);
const totalRibbonRequired = dimensions => dimensions.reduce((a, c) => a + _requiredRibbonForPresent(c), 0);

let inputFile = _readInputFile();
console.log(`Total square footage of required wrapping paper is: ${totalWrappingPaperRequired(inputFile)}`)
console.log(`Total feet of required ribbon is: ${totalRibbonRequired(inputFile)}`)
