import AppError from '~/helpers/app-error';

export default class HttpError extends AppError {

    statusCode: number;

    report?: any;

    constructor(statusCode: number, errorCode: number, message?: string, report?: any) {
        super(errorCode, message);

        this.statusCode = statusCode;
        this.report = report;
    }

}
