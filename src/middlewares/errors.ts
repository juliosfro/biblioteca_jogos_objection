import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { sendMsgError } from '~/helpers/api-errors';
import { ERRORS } from '~/helpers/app-messages-errors';

export const errorsMiddleware: ErrorRequestHandler = (
    error: any,
    _request: Request,
    response: Response,
    next: NextFunction
) => {
    const { name, message } = error;
    let msg = null;

    if (name === ERRORS.SEQUELIZE_DATABASE_ERROR) {
        const { parent } = error;
        const { code } = parent;
        msg = sendMsgError(code);
    }

    if (name === ERRORS.SEQUELIZE_UNIQUE_CONSTRAINT_ERROR) {
        const { errors } = error;
        const [ firstError ] = errors;
        const { path } = firstError;
        const pathString: string = String(path).toUpperCase();
        msg = sendMsgError(pathString);
    }

    switch (name) {
    case ERRORS.VALIDATION_ERROR:
        response.status(400).json({ message });
        break;
    case ERRORS.NOT_FOUND_ERROR:
        response.status(404).json({ message });
        break;
    case ERRORS.CONFLICT_ERROR:
        response.status(409).json({ message });
        break;
    case ERRORS.SEQUELIZE_UNIQUE_CONSTRAINT_ERROR:
        response.status(409).json({ message: msg });
        break;
    case ERRORS.ERROR:
        response.status(409).json({ message });
        break;
    case ERRORS.SEQUELIZE_DATABASE_ERROR:
        response.status(409).json({ message: msg });
        break;
    case ERRORS.UNAUTHORIZED_ERROR:
        response.status(409).json({ message });
        break;
    case ERRORS.PRECONDITION_FAILED_EXCEPTION:
        response.status(412).json({ message });
        break;
    case ERRORS.JSON_WEBTOKEN_ERROR:
        response.status(403).json({ message });
        break;
    case ERRORS.FORBIDDEN_ERROR:
        response.status(403).json({ message });
        break;
    default:
        console.error(error);
        response.sendStatus(500);
    }
    next();
};