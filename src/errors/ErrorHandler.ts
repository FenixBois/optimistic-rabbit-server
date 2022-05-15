import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { EntityNotFound } from './EntityNotFound';
import { ValidationError } from './ValidationError';
import logger from '../config/winston';

export const ErrorHandler: ErrorRequestHandler = (err, req: Request, res: Response, _: NextFunction) => {
    logger.error({
        error: err.message,
        path: req.path,
        parameters: req.query,
        body: req.body,
    });

    if (err instanceof EntityNotFound) return res.status(404).json(err.message);

    if (err instanceof ValidationError) return res.status(400).json(err.message);

    return res.status(500).json(err.message);
};
