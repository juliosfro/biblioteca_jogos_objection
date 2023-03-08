export default class AppError extends Error {

    errorCode: number;

    constructor(errorCode: number, message?: string) {
        super(message);

        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;

        this.errorCode = errorCode;
    }

}
