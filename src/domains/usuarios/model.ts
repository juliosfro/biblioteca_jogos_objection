import bcrypt from 'bcryptjs';
import { AnyQueryBuilder, ModelOptions, QueryContext } from 'objection';
import BaseModel from '~/../database/config/models';
import JogoAdquirido from '~/domains/jogos-adquiridos/model';

const BCRYPT_SALT_LENGTH = Number(process.env.BCRYPT_SALT_LENGTH);

export enum TipoUsuario {
    ADMINISTRADOR = 'ADMINISTRADOR',
    CLIENTE = 'CLIENTE',
}

class Usuario extends BaseModel {

    static get tableName() {
        return 'usuarios';
    }

    static get idColumn() {
        return 'id';
    }

    id!: number;
    nome!: string;
    email!: string;
    senha!: string;
    created_at?: Date;
    updated_at?: Date;
    tipo!: TipoUsuario;
    perm_gerenciar_usuarios?: boolean;

    get $hiddenFields() {
        return [
            'senha',
            'created_at',
            'updated_at',
            'deleted_at',
            'perm_gerenciar_usuarios'
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
                    'usuarios.tipo',
                    'usuarios.perm_gerenciar_usuarios'
                ]);
            },
        };

    }

    hasRole(role: TipoUsuario) {
        return this.tipo === role;
    }

}

export default Usuario;