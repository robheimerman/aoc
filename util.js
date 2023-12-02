import fs from "fs";

export const readSingleLinedFile = filePath => fs.readFileSync(filePath, 'utf8');

export const readMultiLinedFile = filePath =>
    fs.readFileSync(filePath, 'utf8')
        .split('\n');

export const appendFile = (filePath, data) => {
    fs.appendFileSync(filePath, `${JSON.stringify(data)}\n`);
}