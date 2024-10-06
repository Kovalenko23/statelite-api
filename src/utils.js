import fs from 'node:fs';
import path from 'node:path';
import { bannedFolderNames } from './constants.js';

export const read = (from) => {
    try { return fs.readFileSync(from, 'utf8'); } catch (e) {
        return JSON.stringify({})
    }
}

export const write = (to, content) => {
    fs.writeFile(to, content, err => {
        if (err) {
            console.error(err);
        } else {
            // file written successfully
        }
    });
}
export const readDir = (folderPath, struct = {}) => {
    for (const fileName of fs.readdirSync(folderPath)) {

        if (bannedFolderNames.includes(fileName)) {
            continue;
        }

        const nextPath = path.join(folderPath, fileName);
        const stat = fs.lstatSync(nextPath);
        if (stat.isDirectory()) {
            const [year, month] = fileName.split(' ');
            struct[year] = {
                ...struct?.[year],
                [month]: {
                    path: nextPath,
                    data: readDir(nextPath)
                }
            };
        } else {
            const dotIndex = fileName.lastIndexOf('.');
            const file = fileName.slice(0, dotIndex);
            const format = fileName.slice(dotIndex + 1);

            if (!struct[file]) {
                struct[file] = {
                    [format]: nextPath
                }
            }

            struct[file][format] = nextPath;
        }
    }

    return struct;
}
