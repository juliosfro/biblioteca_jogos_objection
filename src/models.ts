import dotenv from 'dotenv';
import createKnex from 'knex';
import omit from 'lodash/omit';
import { AnyQueryBuilder, Model, Pojo } from 'objection';
import path from 'path';

dotenv.config();

import { createKnexConfig } from './factories/knex';

const {
    DB_NAME,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASS,

    DB_SSL_CA,
    DB_SSL_CERT,
    DB_SSL_KEY,
} = process.env;

const knexConfigConnection = {
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    sslCa: DB_SSL_CA,
    sslCert: DB_SSL_CERT,
    sslKey: DB_SSL_KEY,
} as App.Config.KnexConfigConnection;

const knexConfig = createKnexConfig(knexConfigConnection);

export const knex = createKnex(knexConfig);

Model.knex(knex);

class BaseModel extends Model {

    static get modelPaths() {
        return [path.resolve(__dirname, 'domains')];
    }

    static get modifiers() {
        return {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            getOneModifier(_builder: AnyQueryBuilder) {
            },

            // eslint-disable-next-line @typescript-eslint/no-empty-function
            getListModifier(_builder: AnyQueryBuilder) {
            },
        };
    }

    get $hiddenFields(): string[] {
        return [];
    }

    $formatJson(json: Pojo) {
        const jsonFormatted = super.$formatJson(json);
        if (this.$hiddenFields.length) {
            return omit(jsonFormatted, this.$hiddenFields);
        }
        return jsonFormatted;
    }

}

export default BaseModel;
