import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'

export async function checkMealExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getMealParamsSchema.parse(request.params)

  const meal = await knex('meals').select().where('id', id).returning('*')

  if (!meal) {
    return reply.status(404).send('This meal does not exist.')
  }
}
