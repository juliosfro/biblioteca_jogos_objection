import { AnyQueryBuilder, ModelOptions, QueryContext } from 'objection';
import Jogo from '~/domains/jogos/model';
import Usuario from '~/domains/usuarios/model';
import BaseModel from '~/models';

class JogoAdquirido extends BaseModel {

    static get tableName() {
        return 'jogos_adquiridos';
    }

    static get idColumn() {
        return 'id_usuario';
    }

    public id_usuario!: number;
    public id_jogo!: number;
    public created_at?: Date;
    public updated_at?: Date;

    get $hiddenFields() {
        return [
            'id_usuario',
            'id_jogo',
            'created_at',
            'updated_at',
            'deleted_at'
        ];
    }

    $beforeInsert(queryContext: QueryContext): Promise<JogoAdquirido> | void {
        super.$beforeInsert(queryContext);
    }

    $beforeUpdate(options: ModelOptions & { old: JogoAdquirido }, queryContext: QueryContext): Promise<any> | void {
        super.$beforeUpdate(options, queryContext);
        this.updated_at = new Date();
    }

    static get relationMappings() {
        return {
            usuario: {
                relation: JogoAdquirido.HasOneRelation,
                modelClass: Usuario,
                join: {
                    from: 'jogos_adquiridos.id_usuario',
                    to: 'usuarios.id',
                },
            },
            jogo: {
                relation: JogoAdquirido.HasOneRelation,
                modelClass: Jogo,
                join: {
                    from: 'jogos_adquiridos.id_jogo',
                    to: 'jogos.id',
                },
            },
        };
    }

    static get modifiers() {
        return {
            getOneModifier(_builder: AnyQueryBuilder) {
            },

            getListModifier(builder: AnyQueryBuilder) {
                builder.withGraphFetched({
                    usuario: {
                        jogos_adquiridos: {
                            jogo: {
                                categoria: true
                            },
                        },
                    },
                });
            },
            
            getLoginModifier(_query: AnyQueryBuilder) {
            },
        };

    }

}

export default JogoAdquirido;