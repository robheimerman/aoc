import {readFileAndFilter} from "../../util.js";

const partOne = () => {
    const calibrations = readFileAndFilter('./input-p1.txt');
    return calibrations.reduce((total, line) => {
        const nums = line.replace(/[^0-9]/g, '').split('');
        let tenDigit = nums.length === 1 ? nums[0] : nums.shift();
        const tempNum = parseInt(`${tenDigit}${nums.pop()}`, 10);
        return tempNum + total;
    }, 0);
}
const partTwo = () => {
    const replacements = {
        'oneight': 18,
        'twone': 21,
        'threeight': 38,
        'fiveight': 58,
        'sevenine': 79,
        'eightwo': 82,
        'nineight': 98,
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
    };

    const calibrations = readFileAndFilter('./input-p2.txt');
    return calibrations.reduce((total, line) => {
        const regexp = new RegExp(Object.keys(replacements).join('|'), "g");
        const cleanedString = line.replace(regexp, (matcher) => {
            return replacements[matcher];
        });
        const nums = cleanedString.replace(/[^0-9]/g, '').split('');
        let tenDigit = nums.length === 1 ? nums[0] : nums.shift();
        const tempNum = parseInt(`${tenDigit}${nums.pop()}`, 10);
        return tempNum + total;
    }, 0);
}


// console.log(partOne());
console.log(partTwo());