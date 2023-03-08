import HttpError from './http-error';

export default class PreconditionFailedError extends HttpError {

    constructor(code: number, message?: string, report?: any) {
        super(412, code, message, report);
    }

}
