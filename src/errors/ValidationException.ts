import { Result, ValidationError } from 'express-validator';

export class ValidationException extends Error {
    constructor(
        public readonly errors: Result<ValidationError>,
    ) {
        super('Invalid data');
    }
}
