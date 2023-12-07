import {readMultiLinedFile} from "../../util.js";

const partOne = file => {

    let almanac = readMultiLinedFile(file);

    let seeds = almanac[0]
        .slice(7)
        .split(' ')
        .map(str => parseInt(str));

    const indicies = almanac.reduce((a, c, i) => {
        if (i === 0) {
            return a;
        }
        if (c === "") {
            a.push(i);
        }
        return a;
    }, []);

    indicies.forEach((v, i) => {
        const ranges = getAlmanacRanges(almanac, i, indicies.length, v, indicies[i + 1]);
        const newDestination = new Array(seeds.length).fill(null);

        ranges.forEach(range => {

            const mapLegend = range.split(" ").map(str => parseInt(str));

            seeds.forEach((seed, i) => {
                const destination = getDestination(seed, mapLegend);
                if (destination) {
                    newDestination[i] = destination;
                }
            })
        });

        seeds = newDestination.map((destination, index) => destination || seeds[index]);
    });
    return Math.min(...seeds);
};

const getDestination = (seed, [destinationStartRange, sourceRangeStart, length]) => {
    if (seed >= sourceRangeStart && seed < (sourceRangeStart + length)) {
        return seed - sourceRangeStart + destinationStartRange;
    }
    return null;
}
const getAlmanacRanges = (almanac, i, length, startSliceIndex, endSliceIndex) => {
    if (i === (length - 1)) {
        return almanac.slice(-1 * (almanac.length - 2 - startSliceIndex));
    }
    return almanac.slice(startSliceIndex + 2, endSliceIndex);
}

console.log(partOne('input-sample.txt'));
console.log(partOne('input.txt'));

// console.log(partTwo('input-sample.txt'));
// console.log(partTwo('input.txt'));