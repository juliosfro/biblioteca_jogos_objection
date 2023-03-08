import { NextFunction, Request, Response } from 'express';

import {
    calculatePaginationAttributes, Filter, filterBy, orderBy
} from '~/helpers/request-query';

import Joi from '../factories/joi';
import { validateQuery } from './validations';

export const paginationValidador = Joi.object({
    page: Joi.number()
        .min(1),
    limit: Joi.number()
        .min(1)
        .max(100000)
        .default(100000),
});

const publicPaginationValidador = Joi.object({
    page: Joi.number()
        .min(1),
    limit: Joi.number()
        .min(1)
        .max(20)
        .default(20),
});

export const filterOrderValidador = Joi.object({
    filters: Joi.customValidate()
        .json(),
    orders: Joi.customValidate()
        .json(),
});

const paginationMiddleware = (request: Request, _response: Response, next: NextFunction) => {
    const { query } = request;

    const numberPage = Number(query.page);
    const numberLimit = Number(query.limit);

    const { page, offset, limit } = calculatePaginationAttributes(numberPage, numberLimit);

    request.pagination = {
        page,
        limit,
        pageSize: limit,
        offset,
    };

    next();
};

const filterMiddleware = (request: Request, _response: Response, next: NextFunction) => {
    const { filters } = request.query;

    if (filters?.length) {
        request.filterBy = filterBy(filters as Filter[] | Filter);
    } else {
        request.filterBy = () => null;
    }

    next();
};

const orderMiddleware = (request: Request, _response: Response, next: NextFunction) => {
    const { orders } = request.query;

    if (orders?.length) {
        request.orderBy = orderBy(orders as any[]);
    } else {
        request.orderBy = () => null;
    }

    next();
};

export const publicPagination = [
    validateQuery(publicPaginationValidador),
    paginationMiddleware,
];

export const pagination = [
    validateQuery(paginationValidador),
    paginationMiddleware,
];

export const validateQueries = [
    validateQuery(filterOrderValidador),
    validateQuery(paginationValidador),
];

export const filterOrder = [
    validateQuery(filterOrderValidador),
    filterMiddleware,
    orderMiddleware,
];

export const publicQueryMiddleware = [
    ...publicPagination,
    ...filterOrder,
];

export default [
    ...pagination,
    ...filterOrder,
];
