import HttpError from './http-error';

export default class BadRequestError extends HttpError {

    constructor(code: number, message?: string, report?: any) {
        super(400, code, message, report);
    }

}
