declare namespace Express {
    namespace Multer {
        interface File {
            dimensions?: import('sharp').Metadata;
        }
    }

    interface Request {
        user: import('~/domains/usuarios/model').default;
        ability: import('~/helpers/ability').AppAbility;
        files: {
            [key: string]: Express.Multer.File[]
        };
        filterBy?: (builder: import('Knex').QueryBuilder) => void;
        orderBy?: (builder: import('Knex').QueryBuilder) => void;
        pagination?: {
            page: number;
            limit: number;
            offset: number;
        }
    }
}
