import Knex from 'knex';

exports.up = async function up(knex: Knex) {
    await knex.schema.table('usuarios', table => {
        table.boolean('perm_gerenciar_usuarios')
            .defaultTo(false)
            .notNullable()
            .after('senha');
    });
};

exports.down = async function down(knex: Knex) {
    await knex.schema.table('usuarios', table => {
        table.dropColumn('perm_gerenciar_usuarios');
    });
};
