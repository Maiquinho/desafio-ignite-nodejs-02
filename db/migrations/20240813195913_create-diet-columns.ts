import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.integer('meals_amount')
    table.integer('diet_meals')
    table.integer('off_diet_meals')
    table.integer('best_diet_meal_sequence')
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
