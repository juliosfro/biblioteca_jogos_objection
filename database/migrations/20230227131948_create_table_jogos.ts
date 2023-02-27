import Knex from 'knex';

exports.up = async function up(knex: Knex) {
    await knex.schema.createTable('jogos', table => {
        table.bigIncrements('id')
            .primary();

        table.string('nome', 80)
            .notNullable()
            .unique('nome_jogos_unique_constraint');
        
        table.bigInteger('id_categoria_jogo')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('jogos');

        table.timestamps(false, true);
        table.dateTime('deleted_at')
            .index();

    });
};

exports.down = async function down(knex: Knex) {
    await knex.schema.dropTableIfExists('jogos');
};
