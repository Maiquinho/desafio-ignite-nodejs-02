import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const users = await knex('users').select()

    return { users }
  })

  app.get('/:id', async (request) => {
    const getUserParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getUserParamsSchema.parse(request.params)

    const user = await knex('users').select().where('id', id).first()

    return { user }
  })

  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
    })

    const { name, email } = createUserBodySchema.parse(request.body)

    const emailAlreadyExists = await knex('users')
      .select('email')
      .where('email', email)
      .first()
      .returning('email')

    if (emailAlreadyExists) {
      return reply.status(409).send('This e-mail account is already used.')
    }

    await knex('users').insert({
      id: randomUUID(),
      name,
      email,
    })

    return reply.status(201).send()
  })
}
