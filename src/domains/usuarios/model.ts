import bcrypt from 'bcryptjs';
import { AnyQueryBuilder, ModelOptions, QueryContext } from 'objection';
import JogoAdquirido from '~/domains/jogos-adquiridos/model';
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
            'deleted_at',
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
        return {
            jogos_adquiridos: {
                relation: Usuario.HasManyRelation,
                modelClass: JogoAdquirido,
                join: {
                    from: 'jogos_adquiridos.id_usuario',
                    to: 'usuarios.id',
                },
            },
        };
    }

    static get modifiers() {
        return {
            getOneModifier(_builder: AnyQueryBuilder) {
            },

            getListModifier(_builder: AnyQueryBuilder) {
            },

            getLoginModifier(builder: AnyQueryBuilder) {
                builder.select([
                    'usuarios.id',
                    'usuarios.nome',
                    'usuarios.email',
                    'usuarios.senha',
                ]);
            },
        };

    }
}

export default Usuario;