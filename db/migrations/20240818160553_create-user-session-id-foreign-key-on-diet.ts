import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('meals', (table) => {
    table.uuid('user_session_id').unsigned()

    table
      .foreign('user_session_id')
      .references('session_id')
      .inTable('users')
      .onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('meals', (table) => {
    table.dropForeign('user_session_id')
    table.dropColumn('user_session_id')
  })
}
