declare namespace App {
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
