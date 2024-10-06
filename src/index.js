
import express from 'express';
import path from 'path';
import fs from 'node:fs';
import { readDir, write } from './utils.js'

import { DATASET_FOLDER, DATASET_FILES, ASSETS_FOLDER } from './constants.js';

const app = express()
const port = 3000

app.get('/', (req, res) => {
    const { year, month } = req.query;

    const data = fs.readFileSync(path.join(DATASET_FOLDER, DATASET_FILES.data));
    let responseData = JSON.parse(data);


    if (year) {
        responseData = responseData[year] ?? {};
    }

    if (year && month) {
        responseData = responseData[month] ?? {};
    }



    res.setHeader('Content-Type', 'application/json');
    res.json(responseData)
})

app.get('/update', (_, res) => {
    const filePaths = readDir(path.join(ASSETS_FOLDER))
    const stringData = JSON.stringify(filePaths);
    write(path.join(DATASET_FOLDER, DATASET_FILES.data), stringData)
    res.send()
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})