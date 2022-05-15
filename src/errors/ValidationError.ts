export class ValidationError extends Error {
    constructor() {
        super('Invalid data');
    }
}
