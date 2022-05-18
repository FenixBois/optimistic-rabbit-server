import { Result, ValidationError } from 'express-validator';

export class ValidationErrorFound extends Error {
    constructor(
        // super('Invalid data');
        public readonly errors: Result<ValidationError>,
    ) {
        super('Invalid data');
    }
}
