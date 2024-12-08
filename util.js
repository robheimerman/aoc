import fs from "fs";
import {join} from 'path';

export const readSingleLinedFile = filePath => fs.readFileSync(filePath, 'utf8');

export const readMultiLinedFile = (filePath) =>
    fs.readFileSync(filePath, 'utf8')
        .split('\n');

export const readFileAndFilter = (filePath) =>
    readMultiLinedFile(filePath)
        .filter(line => Boolean(line.length));

export const readInputFile = (filePath) =>
    readFileAndFilter(join(filePath, 'input'))
        .filter(line => Boolean(line.length));


