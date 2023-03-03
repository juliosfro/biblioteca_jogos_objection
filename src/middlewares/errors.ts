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

    if (name === ERRORS.UNIQUE_VIOLATION_ERROR) {
        const { constraint } = error;
        msg = sendMsgError(constraint);
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
    case ERRORS.ERROR:
        response.status(409).json({ message });
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
    case ERRORS.UNIQUE_VIOLATION_ERROR:
        response.status(409).json({ message: msg });
        break;
    default:
        console.error(error);
        response.sendStatus(500);
    }
    next();
};