import type { FastifyInstance } from 'fastify'

import { getUser } from './getUser'
import { list } from './list'
import { register } from './register'
import { remove } from './remove'
import { update } from './update'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/user/:email', getUser)
  app.get('/users', list)
  app.post('/users', register)
  app.patch('/user/:id', update)
  app.delete('/user/:id', remove)
}
