import Knex from 'knex';

exports.up = async function up(knex: Knex) {
    await knex.schema.table('usuarios', table => {
        table.enum('tipo', ['ADMINISTRADOR', 'CLIENTE'])
            .notNullable()
            .defaultTo('CLIENTE')
            .after('senha');
    });
};

exports.down = async function down(knex: Knex) {
    await knex.schema.table('usuarios', table => {
        table.dropColumn('tipo');
    });
};
