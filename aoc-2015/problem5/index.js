import {readMultiLinedFile} from "../util.js";

const FILEPATH = './input.txt';

const _readInputFile = () => readMultiLinedFile(FILEPATH)
const _isAnOldNiceWord = word => {
    const numberOfVowels = word.split("").reduce((a, c) => {
        if (['a', 'e', 'i', 'o', 'u'].includes(c)) {
            a++;
        }
        return a;
    }, 0);

    if (numberOfVowels < 3) {
        return false;
    }

    if (!word.match(/([a-zA-Z0-9])\1/gm)) {
        return false;
    }

    if (word.match(/(ab|cd|pq|xy)/gm)) {
        return false;
    }
    return true;
};

const _isAnNewNiceWord = word => {
    const hasValidPair = _hasAValidPair(word);

    if (!hasValidPair) {
        return false;
    }

    return _hasAValidTriple(word);
}
const _hasAValidPair = word => {
    return word.match(/([a-z][a-z]).*\1/);
}
const _hasAValidTriple = word => {
    let hasAValidTriple = false;
    let i = 0;
    while (i < word.length - 2 && !hasAValidTriple) {
        hasAValidTriple = word.charAt(i) === word.charAt(i + 2);
        i++;
    }
    return hasAValidTriple;
}


const filterForOldNiceWords = arrOfWords => arrOfWords.filter(word => _isAnOldNiceWord(word));
const filterForNewNiceWords = arrOfWords => arrOfWords.filter(word => _isAnNewNiceWord(word));

let inputFile = _readInputFile();
console.log(`Number of old nice words are: ${filterForOldNiceWords(inputFile).length}`)
console.log(`Number of new nice words are: ${filterForNewNiceWords(inputFile).length}`)

