declare namespace Express {
    namespace Multer {
        interface File {
            dimensions?: import('sharp').Metadata;
        }
    }

    interface Request {
        user: App.User.AuthenticatedUser;
        ability?: import('~/helpers/ability-helper').AppAbility;
        files: {
            // corrige tipagem do multer
            // https://stackoverflow.com/a/58357812/2826279
            [key: string]: Express.Multer.File[]
        };
        filterBy?: (queryBuilder: import('typeorm').SelectQueryBuilder<import('typeorm').BaseEntity>) => void;
        orderBy?: (queryBuilder: import('typeorm').SelectQueryBuilder<import('typeorm').BaseEntity>) => void;
        pagination?: {
            page: number;
            limit: number;
            offset: number;
        }
    }
}
