import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { EntityNotFound } from './EntityNotFound';
import { ValidationException } from './ValidationException';
import logger from '../config/winston';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const ErrorHandler: ErrorRequestHandler = (err, req: Request, res: Response, _: NextFunction) => {
    logger.error({
        error: err.message,
        path: req.path,
        parameters: req.query,
        body: req.body,
    });

    if (err instanceof EntityNotFound) return res.status(404).json(err.message);

    if (err instanceof ValidationException) return res.status(400).json(err.errors.array());

    if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') return res.status(404).send('Record does not exist.');
        return res.status(500).send('Something went wrong');
    }

    if (err instanceof Error) return res.status(500).json('Something went wrong');

    return res.status(500).json('Something went wrong');
};
