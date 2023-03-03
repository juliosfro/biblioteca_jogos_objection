import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { sendMsgError } from '~/helpers/api-errors';
import { DATABASE_ERRORS } from '~/helpers/app-messages-errors';

export const errorsMiddleware: ErrorRequestHandler = (
    error: any,
    _request: Request,
    response: Response,
    next: NextFunction
) => {
    const { name, message } = error;
    let msg = null;

    if (name === DATABASE_ERRORS.UNIQUE_VIOLATION_ERROR) {
        const { constraint } = error;
        msg = sendMsgError(constraint);
    }

    switch (name) {
    case DATABASE_ERRORS.VALIDATION_ERROR:
        response.status(400).json({ message });
        break;
    case DATABASE_ERRORS.NOT_FOUND_ERROR:
        response.status(404).json({ message });
        break;
    case DATABASE_ERRORS.CONFLICT_ERROR:
        response.status(409).json({ message });
        break;
    case DATABASE_ERRORS.ERROR:
        response.status(409).json({ message });
        break;
    case DATABASE_ERRORS.UNAUTHORIZED_ERROR:
        response.status(409).json({ message });
        break;
    case DATABASE_ERRORS.PRECONDITION_FAILED_EXCEPTION:
        response.status(412).json({ message });
        break;
    case DATABASE_ERRORS.JSON_WEBTOKEN_ERROR:
        response.status(403).json({ message });
        break;
    case DATABASE_ERRORS.FORBIDDEN_ERROR:
        response.status(403).json({ message });
        break;
    case DATABASE_ERRORS.UNIQUE_VIOLATION_ERROR:
        response.status(409).json({ message: msg });
        break;
    default:
        console.error(error);
        response.sendStatus(500);
    }
    next();
};