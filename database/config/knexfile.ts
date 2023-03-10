import { format as formatDate } from 'date-fns-tz';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import Knex from 'knex';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, '..', '..', '.env'),
});

const {
    DB_NAME,
    DB_HOST,
    DB_PORT,

    DB_MIGRATION_USER,
    DB_MIGRATION_PASS,

    TZ,

    DB_SSL_CA,
    DB_SSL_CERT,
    DB_SSL_KEY,
} = process.env;

const isSecureConnection = (DB_SSL_CA && DB_SSL_CERT && DB_SSL_KEY);

const config: Knex.Config = {
    client: 'mysql2',
    debug: true,
    connection: {
        database: DB_NAME,
        host: DB_HOST,
        port: Number(DB_PORT),
        user: DB_MIGRATION_USER,
        password: DB_MIGRATION_PASS,

        timezone: formatDate(new Date(), 'XXX', { timeZone: TZ }),

        ssl: isSecureConnection ? {
            ca: DB_SSL_CA ? readFileSync(DB_SSL_CA) : undefined,
            cert: DB_SSL_CERT ? readFileSync(DB_SSL_CERT) : undefined,
            key: DB_SSL_KEY ? readFileSync(DB_SSL_KEY) : undefined,
        } : undefined,
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './../migrations',
        stub: './../migration.stub',
    },
    seeds: {
        directory: './../seeds',
        stub: './../seed.stub',
    },
    // Esse parâmetro foi adicionado porque o knex separa a criação da tabela e a criação da primary key em dois
    // comandos, quando se é utilizado uma chave primária que não é "autoincrementavel", por exemplo uma string,
    // porém a DigitalOcean trava essa separação por não deixar criar uma tabela sem chave primária.
    // Para isso no momento de criar a conexão que irá rodar as migrações está sendo desabilitada a chave
    // que exige a criação de tabelas com chave primária.
    // Link da issue do problema no repositório do knex: https://github.com/knex/knex/issues/4141
    // Link no repositório do Laravel utilizado como base para resolver o problema:
    // https://github.com/laravel/framework/issues/33238#issuecomment-647464620
    pool: {
        afterCreate(connection: any, done: any) {
            connection.query('SET sql_require_primary_key=0', (err: any) => {
                done(err, connection);
            });
        },
    },

};

module.exports = config;
