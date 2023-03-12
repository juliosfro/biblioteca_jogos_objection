declare namespace App {
    declare namespace Router {
        type SwaggerContentType = 'multipart/form-data' | 'application/json';

        type SwaggerParameterObject = import('openapi-types').OpenAPIV3.OpenAPIV3.ParameterObject |
            import('openapi-types').OpenAPIV3.OpenAPIV3.ReferenceObject;

        type SwaggerCustomRouteObject = {
            contentType?: SwaggerContentType;
            errorCodes?: number[];
        };

        type SwaggerRouteObject = import('openapi-types').OpenAPIV3.OperationObject<SwaggerCustomRouteObject>;

        type RouteValidation = import('joi').AnySchema | {
            schema: import('joi').AnySchema;
            options?: import('joi').ValidationOptions;
        };

        type Route = {
            method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
            path: string;
            handlers: Array<import('express-serve-static-core').RequestHandlerParams>;
            public?: boolean;
            internal?: boolean;
            validationBody?: RouteValidation,
            validationQuery?: RouteValidation,
            validationParams?: RouteValidation,
            swagger?: SwaggerRouteObject;
        };
    }

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
