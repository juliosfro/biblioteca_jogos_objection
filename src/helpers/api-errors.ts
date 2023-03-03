import {
    APP_MSG_ERRORS,
    DATABASE_ERRORS
} from '~/helpers/app-messages-errors';

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

function sendMsgError(errorPathOrCode: String) {
    switch (errorPathOrCode) {
    case DATABASE_ERRORS.CONSTRAINT_ERRORS.NOME_CATEGORIA_JOGOS_UNIQUE_CONSTRAINT:
        return APP_MSG_ERRORS.NOME_CATEGORIA_JOGOS_UNIQUE_CONSTRAINT[101];
        break;
    case DATABASE_ERRORS.CONSTRAINT_ERRORS.NOME_JOGOS_UNIQUE_CONSTRAINT:
        return APP_MSG_ERRORS.NOME_JOGOS_UNIQUE_CONSTRAINT[101];
        break;
    case DATABASE_ERRORS.CONSTRAINT_ERRORS.PRIMARY:
        return APP_MSG_ERRORS.PRIMARY[101];
        break;
    case DATABASE_ERRORS.ER_BAD_FIELD_ERROR:
        return APP_MSG_ERRORS.ER_BAD_FIELD_ERROR[102];
        break;
    case DATABASE_ERRORS.CONSTRAINT_ERRORS.EMAIL_USUARIOS_UNIQUE_CONSTRAINT:
        return APP_MSG_ERRORS.EMAIL_USUARIOS_UNIQUE_CONSTRAINT[101];
        break;
    default:
        return APP_MSG_ERRORS.DEFAULT[1];
    }
}

export {
    sendMsgError,
};
