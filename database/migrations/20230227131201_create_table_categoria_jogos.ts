import Knex from 'knex';

exports.up = async function up(knex: Knex) {
    await knex.schema.createTable('categoria_jogos', table => {
        table.bigIncrements('id')
            .primary();

        table.string('nome', 80)
            .unique('nome_categoria_jogos_unique_constraint')
            .notNullable();

        table.timestamps(false, true);
        table.dateTime('deleted_at')
            .index();

    });
};

exports.down = async function down(knex: Knex) {
    await knex.schema.dropTableIfExists('categoria_jogos');
};
