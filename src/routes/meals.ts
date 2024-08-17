import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { getCurrentTimestamp } from '../utils/date-format'
import { checkMealExists } from '../middlewares/check-meal-exists'

export async function mealsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const meals = await knex('meals').select()

    return { meals }
  })

  app.get(
    '/:id',
    {
      preHandler: [checkMealExists],
    },
    async (request) => {
      const getMealParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getMealParamsSchema.parse(request.params)

      const meal = await knex('meals').select().where('id', id).first()

      return { meal }
    },
  )

  app.post('/', async (request, reply) => {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      on_diet: z.boolean(),
    })

    const {
      name,
      description,
      on_diet: onDiet,
    } = createMealBodySchema.parse(request.body)

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      on_diet: onDiet,
    })

    return reply.status(201).send()
  })

  app.put(
    '/:id',
    {
      preHandler: [checkMealExists],
    },
    async (request, reply) => {
      const getMealParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getMealParamsSchema.parse(request.params)

      console.log(getCurrentTimestamp())

      const createUpdatedMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        on_diet: z.boolean(),
      })

      const {
        name,
        description,
        on_diet: onDiet,
      } = createUpdatedMealBodySchema.parse(request.body)

      await knex('meals')
        .update({
          name,
          description,
          updated_at: getCurrentTimestamp(),
          on_diet: onDiet,
        })
        .where('id', id)

      return reply.status(201).send()
    },
  )

  app.patch(
    '/:id/ondiet',
    {
      preHandler: [checkMealExists],
    },
    async (request, reply) => {
      const getMealParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getMealParamsSchema.parse(request.params)

      const meal = await knex('meals')
        .select('on_diet')
        .where('id', id)
        .returning('on_diet')
        .first()

      const updatedMealDietStatus = !meal?.on_diet

      await knex('meals')
        .update({
          updated_at: getCurrentTimestamp(),
          on_diet: updatedMealDietStatus,
        })
        .where('id', id)

      return reply.status(201).send()
    },
  )

  app.delete(
    '/:id',
    {
      preHandler: [checkMealExists],
    },
    async (request, reply) => {
      const getMealParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getMealParamsSchema.parse(request.params)

      await knex('meals').delete().where('id', id)

      return reply.status(204).send()
    },
  )
}
