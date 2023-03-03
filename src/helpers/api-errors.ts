import {
    DEFAULT, EMAIL_USUARIOS_UNIQUE_CONSTRAINT,
    ER_BAD_FIELD_ERROR, NAME_ERRORS,
    NOME_CATEGORIA_JOGOS_UNIQUE_CONSTRAINT,
    NOME_JOGOS_UNIQUE_CONSTRAINT, PRIMARY
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
    case NAME_ERRORS.NOME_CATEGORIA_JOGOS_UNIQUE_CONSTRAINT:
        return NOME_CATEGORIA_JOGOS_UNIQUE_CONSTRAINT[101];
        break;
    case NAME_ERRORS.NOME_JOGOS_UNIQUE_CONSTRAINT:
        return NOME_JOGOS_UNIQUE_CONSTRAINT[101];
        break;
    case NAME_ERRORS.PRIMARY:
        return PRIMARY[101];
        break;
    case NAME_ERRORS.ER_BAD_FIELD_ERROR:
        return ER_BAD_FIELD_ERROR[102];
        break;
    case NAME_ERRORS.EMAIL_USUARIOS_UNIQUE_CONSTRAINT:
        return EMAIL_USUARIOS_UNIQUE_CONSTRAINT[101];
        break;
    default:
        return DEFAULT[1];
    }
}

export {
    sendMsgError,
};
