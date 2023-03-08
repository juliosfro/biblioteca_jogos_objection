import HttpError from './http-error';

export default class NotFoundError extends HttpError {

    constructor(code: number = 20, message?: string, report?: any) {
        super(404, code, message, report);
    }

}
