import HttpError from './http-error';

export default class ForbiddenError extends HttpError {

    constructor(code: number = 31, message?: string, report?: any) {
        super(403, code, message, report);
    }

}
