declare namespace App {
    type FilterOrderQuery = {
        filters: import('~/helpers/request-query').Filter[],
        orders: import('~/helpers/request-query').OrderTuple[],
        [k: string]: import('express-serve-static-core').Query,
    };

    type RequestFilterOrder<
        P = import('express-serve-static-core').ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = FilterOrderQuery,
        > = import('express').Request<P, ResBody, ReqBody, ReqQuery>;
    
    declare namespace Auth {
        interface IJWTUserPayload extends import('jsonwebtoken').JwtPayload {
            id: number;
            tipo: import('~/domains/usuarios/model').TipoUsuario;
        }
    }

    declare namespace Config {
        type KnexConfigConnection = {
            database: string,
            host: string,
            port: string,
            username: string,
            password: string,
            sslCa: string,
            sslCert: string,
            sslKey: string,
        };
    }
}
