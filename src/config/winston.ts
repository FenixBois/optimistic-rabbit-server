// import winston, { createLogger } from 'winston';
import winston, { createLogger } from 'winston';

const { timestamp, combine, json } = winston.format;

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(timestamp(), json()),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log', dirname: 'logs' }),
    ],
});

export default logger;
