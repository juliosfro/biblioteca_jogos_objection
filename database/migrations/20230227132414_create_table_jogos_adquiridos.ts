import Knex from 'knex';

exports.up = async function up(knex: Knex) {
    await knex.schema.createTable('jogos_adquiridos', table => {
        table.bigInteger('id_usuario')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('usuarios');

        table.bigInteger('id_jogo')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('jogos');
        
        table.primary(['id_usuario', 'id_jogo'], 'jogos_adquiridos_unique_constraint');
        table.index(['id_usuario', 'id_jogo'], 'jogos_adquiridos_unique_constraint');

        table.timestamps(false, true);
        table.dateTime('deleted_at')
            .index();
    });
};

exports.down = async function down(knex: Knex) {
    await knex.schema.dropTableIfExists('jogos_adquiridos');
};
