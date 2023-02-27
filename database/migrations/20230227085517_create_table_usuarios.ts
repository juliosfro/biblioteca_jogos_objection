import Knex from 'knex';

exports.up = async function up(knex: Knex) {
    await knex.schema.createTable('usuarios', table => {
        table.bigIncrements('id')
            .primary();

        table.string('nome', 80)
            .notNullable();

        table.string('email', 60)
            .unique()
            .notNullable();

        table.string('senha', 80)
            .notNullable();
   
        table.timestamps(false, true);
        table.dateTime('deleted_at')
            .index();
        
    });
};

exports.down = async function down(knex: Knex) {
    await knex.schema.dropTableIfExists('usuarios');
};
