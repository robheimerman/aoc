import crypto from 'crypto'

const STRING_TO_HASH_PREFIX = 'ckczppom';

const _computeHash = num => crypto.createHash('md5').update(num).digest('hex');

const findHash = (stringToHashPrefix, patternToMatch) => {
    let num = 0;
    let hash = _computeHash(`${stringToHashPrefix}${num}`);
    while (!hash.startsWith(patternToMatch)) {
        num++;
        hash = _computeHash(`${stringToHashPrefix}${num}`)
    }
    return num;
}

console.log(findHash(STRING_TO_HASH_PREFIX, '00000'));
console.log(findHash(STRING_TO_HASH_PREFIX, '000000'));