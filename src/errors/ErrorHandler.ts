import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { EntityNotFound } from './EntityNotFound';
import { ValidationErrorFound } from './ValidationErrorFound';
import logger from '../config/winston';

export const ErrorHandler: ErrorRequestHandler = (err, req: Request, res: Response, _: NextFunction) => {
    logger.error({
        error: err.message,
        path: req.path,
        parameters: req.query,
        body: req.body,
    });

    // console.log(err);

    if (err instanceof EntityNotFound) {
        return res.status(404).json(err.message);
    }

    console.log(`Is instance ${err instanceof ValidationErrorFound}`);

    if (err instanceof ValidationErrorFound) {
        console.log('YES');
        return res.status(400).json(err.errors.array());
    }

    return res.status(500).json(err.message);
};
