export default class ApiError extends Error {
    errorCode: number;
    constructor(errorCode: number, message?: string) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.errorCode = errorCode;
    }
}

export class ValidationError extends ApiError {
    constructor(message: string) {
        super(400, message);
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(404, message);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string) {
        super(401, message);
    }
}

export class PreconditionFailedException extends ApiError {
    constructor(message: string) {
        super(412, message);
    }
}

export class ForbiddenError extends ApiError {
    constructor(message: string) {
        super(403, message);
    }
}
