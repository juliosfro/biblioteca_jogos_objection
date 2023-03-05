import { AnyQueryBuilder, ModelOptions, QueryContext } from 'objection';
import BaseModel from '~/config/models';

class CategoriaJogo extends BaseModel {

    static get tableName() {
        return 'categoria_jogos';
    }

    static get idColumn() {
        return 'id';
    }

    public id!: number;
    public nome!: string;
    public created_at?: Date;
    public updated_at?: Date;

    get $hiddenFields() {
        return [
            'created_at',
            'updated_at',
            'deleted_at'
        ];
    }

    $beforeInsert(queryContext: QueryContext): Promise<CategoriaJogo> | void {
        super.$beforeInsert(queryContext);
    }

    $beforeUpdate(options: ModelOptions & { old: CategoriaJogo }, queryContext: QueryContext): Promise<any> | void {
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

export default CategoriaJogo;