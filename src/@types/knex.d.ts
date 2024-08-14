// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      session_id: string
      name: string
      email: string
      created_at: string
      updated_at: string
      meals_amount: number
      diet_meals: number
      off_diet_meals: number
      best_diet_meal_sequence: number
    }
    meals: {
      id: string
      name: string
      description: string
      created_at: string
      updated_at: string
      on_diet: boolean
    }
  }
}
