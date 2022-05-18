// import winston, { createLogger } from 'winston';
import winston, { createLogger } from 'winston';
import {Request} from "express";

const { timestamp, combine, json, errors } = winston.format;

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(errors({ stack: true }), timestamp(), json()),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log', dirname: 'logs' }),
    ],
});

export const requestLogger = (req: Request) => {
    logger.info({
        method: req.method,
        originalUrl: req.originalUrl,
        ip: req.ip,
        hostname: req.hostname,
        body: req.body,
        params: req.params,
        query: req.query,
    });
}

export default logger;
