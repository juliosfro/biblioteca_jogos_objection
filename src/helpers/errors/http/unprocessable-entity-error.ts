import HttpError from './http-error';

export default class UnprocessableEntityError extends HttpError {

    constructor(code: number, message?: string, report?: any) {
        super(422, code, message, report);
    }

}
