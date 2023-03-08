import HttpError from './http-error';

export default class UnauthorizedError extends HttpError {

    constructor(code: number, message?: string, report?: any) {
        super(401, code, message, report);
    }

}
