import express from 'express';
import winston from 'winston';

import gradesRouter from './routes/routes.js';

import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.fileName = "grades.json";

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "grades-control-api.log" })
    ],
    format: combine(
        label({ label: "grades-control-api" }),
        timestamp(),
        myFormat
    )
});

const api = express();
api.use(express.json());

api.use("/grades", gradesRouter);

api.listen(3333, async () => {

    try{

        JSON.parse(await readFile(global.fileName));
        logger.info('Starting the API...');

    }catch(err){

        const initialJson = {
            nextId: 1,
            grades: []
        }

        writeFile(global.fileName, JSON.stringify(initialJson))
            .then(() => logger.info("API already started and a file was created."))
            .catch(err => logger.error(err));
    }
});