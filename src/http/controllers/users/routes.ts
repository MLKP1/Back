import type { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
import { getUser } from './getUser'
import { list } from './list'
import { logout } from './logout'
import { refresh } from './refresh'
import { register } from './register'
import { remove } from './remove'
import { update } from './update'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/user/:email', getUser)
  app.get('/users', list)
  app.post('/users', register)
  app.patch('/user/:id', update)
  app.delete('/user/:id', remove)

  app.post('/auth/login', authenticate)
  app.patch('/auth/refresh', refresh)
  app.delete('/auth/logout', logout)
}
