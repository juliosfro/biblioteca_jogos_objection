import { readFileSync } from 'fs';

export const createKnexConfig = (knexConfigConnection: App.Config.KnexConfigConnection) => {
    const {
        database,
        host,
        port,
        username,
        password,
        sslCa,
        sslCert,
        sslKey,
    } = knexConfigConnection;

    const isSecureConnection = (sslCa && sslCert && sslKey);

    return {
        debug: true,
        client: 'mysql2',
        connection: {
            database,
            host,
            port,
            user: username,
            password,
            charset: 'utf8mb4',

            ssl: isSecureConnection ? {
                ca: readFileSync(sslCa),
                cert: readFileSync(sslCert),
                key: readFileSync(sslKey),
            } : undefined,

            decimalNumbers: true,

            typeCast(field: any, next: any) {
                const {
                    type, length, string,
                } = field;

                if (type === 'TINY' && length === 1) {
                    const value = string();
                    switch (value) {
                    case '1': return true;
                    case '0': return false;
                    default: return value;
                    }
                }

                if (type === 'DATE') {
                    return string();
                }

                return next();
            },
        },

        pool: {
            min: 0,
            max: 10,
        },
    };
};
