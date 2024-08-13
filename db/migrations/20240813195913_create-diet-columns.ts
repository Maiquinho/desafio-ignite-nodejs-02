import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.integer('meals_amount').notNullable().defaultTo(0)
    table.integer('diet_meals').notNullable().defaultTo(0)
    table.integer('off_diet_meals').notNullable().defaultTo(0)
    table.integer('best_diet_meal_sequence').notNullable().defaultTo(0)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumns(
      'meals_amount',
      'diet_meals',
      'off_diet_meals',
      'best_diet_meal_sequence',
    )
  })
}
