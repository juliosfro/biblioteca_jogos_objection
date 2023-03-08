declare namespace Express {
    interface Request {
        user: import('~/domains/usuarios/types').Usuario;
        ability?: import('~/helpers/ability-helper').AppAbility;
        i18n?: import('i18next').i18n
        files: {
            // corrige tipagem do multer
            // https://stackoverflow.com/a/58357812/2826279
            [key: string]: Express.Multer.File[]
        };
        filterBy?: (queryBuilder: import('knex').QueryBuilder) => void;
        orderBy?: (queryBuilder: import('knex').QueryBuilder) => void;
        pagination?: Pagination;
        accountOwnerUser: import('~/domains/usuarios/types').Usuario;
        timezone: date;
    }

    type Pagination = {
        page: number;
        limit: number;
        offset: number;
        pageSize?: number;
    };
}
