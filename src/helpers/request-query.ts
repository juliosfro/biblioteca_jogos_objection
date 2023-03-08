import Knex from 'knex';
import isPlainObject from 'lodash/isPlainObject';

// import appConfig from '~/config/app';

const allowedWhereMethods = [
    'where',
    'whereNot',
    'whereIn',
    'whereNotIn',
    'whereNull',
    'whereNotNull',
    'whereExists',
    'whereNotExists',
    'whereBetween',
    'whereNotBetween',
    'orWhere',
    'orWhereNot',
    'orWhereIn',
    'orWhereNotIn',
    'orWhereNull',
    'orWhereNotNull',
    'orWhereExists',
    'orWhereNotExists',
    'orWhereBetween',
    'orWhereNotBetween',
];

type WhereMethod = typeof allowedWhereMethods[number];
type WhereTuple = [string, string, any] | [string, any];

export type Filter = {
    [method in WhereMethod]?: WhereTuple;
};

export type OrderTuple = [string, string];

function applyFilters(builder: Knex.QueryBuilder, filters: Filter | Filter[]) {
    if (Array.isArray(filters)) {
        builder.where(qb => {
            filters.forEach(f => {
                applyFilters(qb, f);
            });
        });
    } else {
        builder['where']('');
    }
}

export function filterBy(requestFilters?: Filter | Filter[]) {
    return (builder: Knex.QueryBuilder) => {
        if (!requestFilters?.length) {
            return;
        }

        builder.where(qb => {
            if (Array.isArray(requestFilters)) {
                requestFilters.forEach(f => applyFilters(qb, f));
            } else if (isPlainObject(requestFilters)) {
                applyFilters(qb, requestFilters);
            }
        });
    };
}

const sorterAscOptions = ['asc', 'ascend', '', null, undefined];
const sorterInvalidOptions = [null, undefined, 'null', 'undefined'];

function isValidSortTuple(order: OrderTuple) {
    const [column, sorter = ''] = order;
    return !sorterInvalidOptions.includes(column)
        && !sorterInvalidOptions.includes(sorter);
}

export function orderBy(requestOrders?: OrderTuple[]) {
    return (builder: Knex.QueryBuilder) => {
        const orders = requestOrders?.filter(isValidSortTuple);
        if (!orders?.length) {
            return;
        }

        orders.forEach(order => {
            const [column, sorter] = order;
            const direction = sorterAscOptions.includes(sorter.toLowerCase()) ? 'ASC' : 'DESC';
            builder.orderBy(column, direction);
        });
    };
}

export function calculatePaginationAttributes(page?: number, limit?: number) {
    let sanitizedPage = 1;
    if (typeof page === 'number' && page > 0) {
        sanitizedPage = page;
    }

    let sanitizedLimit = 100;
    if (typeof limit === 'number' && limit > 0) {
        sanitizedLimit = limit;
    }

    const offset = (sanitizedPage - 1) * sanitizedLimit;

    return {
        page: sanitizedPage,
        limit: sanitizedLimit,
        offset,
    };
}
