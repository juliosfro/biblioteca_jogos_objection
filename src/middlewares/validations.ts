import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import checkAndReturnValidationResult from '~/helpers/validation';

export const validateBody = (joiSchema: Joi.AnySchema, joiConfig?: Joi.ValidationOptions) => async (
    request: Request,
    _response: Response,
    next: NextFunction,
) => {
    try {
        const { body } = request;
        const result = await checkAndReturnValidationResult(joiSchema, body, {
            stripUnknown: true,
            ...joiConfig,
        });
        request.body = result;
        next();
    } catch (err) {
        next(err);
    }
};

export const validateQuery = (joiSchema: Joi.AnySchema, joiConfig?: Joi.ValidationOptions) => async (
    request: Request,
    _response: Response,
    next: NextFunction,
) => {
    try {
        const { query } = request;
        const result = await checkAndReturnValidationResult(joiSchema, query, joiConfig);
        request.query = result;
        next();
    } catch (err) {
        next(err);
    }
};

export const validateParams = (joiSchema: Joi.AnySchema, joiConfig?: Joi.ValidationOptions) => async (
    request: Request,
    _response: Response,
    next: NextFunction,
) => {
    try {
        const { params } = request;
        const result = await checkAndReturnValidationResult(joiSchema, params, joiConfig);
        request.params = result;
        next();
    } catch (err) {
        next(err);
    }
};
