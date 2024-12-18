import {readSingleLinedFile} from "../../util.js";
import {dirname} from "path";
import {fileURLToPath} from "url";

const mulRegExp = /mul\((\d{1,3}),(\d{1,3})\)/g;

const calculateInstructions = (contents) => {
    const matches = contents.match(mulRegExp);
    return matches.reduce((a, c) => {
        const str = c.replace(mulRegExp, "$1,$2");
        const [num1, num2] = str.split(',');
        return parseInt(num1, 10) * parseInt(num2, 10) + a;
    }, 0);
}

export const partOne = () => {
    const contents = readSingleLinedFile(dirname(fileURLToPath(import.meta.url)));
    return calculateInstructions(contents);
}

export const partTwo = () => {
    const contents = readSingleLinedFile(dirname(fileURLToPath(import.meta.url)));

    const parseString = contents
        .split("do()")
        .map((section) => section.split("don't()").shift())
        .join('');

    return calculateInstructions(parseString);
};
