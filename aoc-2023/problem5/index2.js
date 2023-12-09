import {readMultiLinedFile} from "../../util.js";
import _ from 'lodash';


const partTwo = file => {
    const almanac = readMultiLinedFile(file);
    const indexes = getIndexes(almanac);

    const mappings =
        indexes
            .map((v, i) =>
                getAlmanacRanges(almanac, i, indexes.length, v, indexes[i + 1])
                    .map(range => range.split(" ").map(str => parseInt(str))));


    const seeds = almanac[0]
        .slice(7)
        .split(' ');

    let min = +Infinity;

    const seedRanges =
        _.chain(seeds)
            .map(str => parseInt(str))
            .chunk(2)
            .map(([start, length]) => [start, start + length - 1])
            .value();

    seedRanges.forEach(seeds => {
        mappings.forEach(mapping => makeInterval(seeds, mapping));
    });

    return seedRanges;
}

const makeInterval = ([start, end], mapping) => {
    const startDestination = getDestination(start, mapping);
    const endingDestination = getDestination(end, mapping);
    const difference = end - start;





}

const fileParser = (almanac, seeds, indexes) => {

    indexes.forEach((v, i) => {
        const ranges = getAlmanacRanges(almanac, i, indexes.length, v, indexes[i + 1]);
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

const getIndexes = almanac => {
    return almanac.reduce((a, c, i) => {
        if (i === 0) {
            return a;
        }
        if (c === "") {
            a.push(i);
        }
        return a;
    }, []);
}

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

// console.log(partOne('input-sample.txt'));
// console.log(partOne('input.txt'));

console.log(partTwo('input-sample.txt'));
// console.log(partTwo('input.txt'));

