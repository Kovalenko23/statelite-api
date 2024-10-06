import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const ASSETS_FOLDER = path.join(__dirname, ('../assets'));
export const DATASET_FOLDER = path.join(__dirname, ('../dataset'))
export const DATASET_FILES = {
    data: 'data.json'
}
export const bannedFolderNames = ['.DS_Store']