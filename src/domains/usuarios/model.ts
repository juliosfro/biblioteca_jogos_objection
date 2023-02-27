import bcrypt from 'bcryptjs';
import { AnyQueryBuilder, ModelOptions, QueryContext } from 'objection';
import BaseModel from '~/models';

const BCRYPT_SALT_LENGTH = Number(process.env.BCRYPT_SALT_LENGTH);

class Usuario extends BaseModel {

    static get tableName() {
        return 'usuarios';
    }

    static get idColumn() {
        return 'id';
    }

    public id!: number;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public created_at?: Date;
    public updated_at?: Date;

    get $hiddenFields() {
        return [
            'senha',
            'created_at',
            'updated_at',
            'deleted_at'
        ];
    }

    $beforeInsert(queryContext: QueryContext): Promise<Usuario> | void {
        super.$beforeInsert(queryContext);
        this.senha = bcrypt.hashSync(this.senha, BCRYPT_SALT_LENGTH);
    }

    $beforeUpdate(options: ModelOptions & { old: Usuario }, queryContext: QueryContext): Promise<any> | void {
        super.$beforeUpdate(options, queryContext);
        this.updated_at = new Date();
    }

    static get relationMappings() {
        return {};
    }

    static get modifiers() {
        return {
            getOneModifier(_builder: AnyQueryBuilder) {
            },

            getListModifier(_builder: AnyQueryBuilder) {
            },

            getLoginModifier(_query: AnyQueryBuilder) {
            },
        };

    }

}

export default Usuario;