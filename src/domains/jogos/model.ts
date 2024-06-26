import { AnyQueryBuilder, ModelOptions, QueryContext } from 'objection';
import BaseModel from '~/../database/config/models';
import CategoriaJogo from '~/domains/categoria-jogos/model';

class Jogo extends BaseModel {

    static get tableName() {
        return 'jogos';
    }

    static get idColumn() {
        return 'id';
    }

    public id!: number;
    public nome!: string;
    public id_categoria_jogo!: number;
    public readonly categoria!: CategoriaJogo;
    public created_at?: Date;
    public updated_at?: Date;

    get $hiddenFields() {
        return [
            'id_categoria_jogo',
            'created_at',
            'updated_at',
            'deleted_at'
        ];
    }

    $beforeInsert(queryContext: QueryContext): Promise<Jogo> | void {
        super.$beforeInsert(queryContext);
    }

    $beforeUpdate(options: ModelOptions & { old: Jogo }, queryContext: QueryContext): Promise<any> | void {
        super.$beforeUpdate(options, queryContext);
        this.updated_at = new Date();
    }

    static get relationMappings() {
        return {
            categoria: {
                relation: Jogo.HasOneRelation,
                modelClass: CategoriaJogo,
                join: {
                    from: 'jogos.id_categoria_jogo',
                    to: 'categoria_jogos.id',
                },
            },
        };
    }

    static get modifiers() {
        return {
            getOneModifier(builder: AnyQueryBuilder) {
                /**
                 * Para pesquisar por categoria atraves de query params eh necessario declarar a juncao por join.
                 */
                builder.join('categoria_jogos', 'categoria_jogos.id', 'jogos.id_categoria_jogo');
                builder.withGraphFetched('categoria');

                builder.modifyGraph('categoria', (categoriaQb: AnyQueryBuilder) => {
                    categoriaQb.select('id', 'nome');
                });
            },

            getListModifier(_builder: AnyQueryBuilder) {
            },

            getLoginModifier(_query: AnyQueryBuilder) {
            },
        };

    }

}

export default Jogo;