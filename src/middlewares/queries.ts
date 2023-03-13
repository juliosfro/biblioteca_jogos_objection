import {
    NextFunction, Request, RequestHandler, Response
} from 'express';

import Joi from '~/factories/joi';
import {
    calculatePaginationAttributes, Filter, filterBy, orderBy, OrderTuple
} from '~/helpers/request-query';

import { validateQuery } from '~/middlewares/validations';

type PaginationRequest = Request<any, any, any, { page?: number, limit?: number }>;

const paginationMiddleware = (request: PaginationRequest, _response: Response, next: NextFunction) => {
    const { query } = request;
    const { page, offset, limit } = calculatePaginationAttributes(query.page, query.limit);

    request.pagination = {
        page,
        limit,
        offset,
    };

    next();
};

type FiltersOrdersRequest = Request<any, any, any, { filters?: Filter[], orders?: OrderTuple[] }>;

function filtersOrdersMiddleware(request: FiltersOrdersRequest, _: Response, next: NextFunction) {
    const { orders, filters } = request.query;

    if (filters?.length) {
        request.filterBy = filterBy(filters);
    } else {
        request.filterBy = () => null;
    }

    if (orders?.length) {
        request.orderBy = orderBy(orders);
    } else {
        request.orderBy = () => null;
    }

    next();
}

const paginationValidator = Joi.object({
    page: Joi.number()
        .min(0),
    limit: Joi.number()
        .min(1)
        .max(100000),
});

export const paginationsMiddleware = [
    validateQuery(paginationValidator),
    paginationMiddleware,
];

const filtersOrdersValidador = Joi.object({
    filters: Joi.customValidate()
        .json(),
    orders: Joi.request()
        .orders(),
});

export const filterOrderHandlers = [
    validateQuery(filtersOrdersValidador),
    filtersOrdersMiddleware,
];

const queriesMiddleware: RequestHandler<any, any, any, any>[] = [
    ...paginationsMiddleware,
    ...filterOrderHandlers,
];

export default queriesMiddleware;
