import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

import { authenticate } from './authenticate'
import { getUser } from './getUser'
import { list } from './list'
import { logout } from './logout'
import { refresh } from './refresh'
import { register } from './register'
import { remove } from './remove'
import { update } from './update'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.get('/user', { onRequest: [verifyJWT] }, getUser)
  // TODO: separate the route of update into more
  app.patch('/user', { onRequest: [verifyJWT] }, update)
  app.delete('/user', { onRequest: [verifyJWT] }, remove)

  app.post('/auth/login', authenticate)
  app.patch('/auth/refresh', refresh)
  app.delete('/auth/logout', { onRequest: [verifyJWT] }, logout)

  app.get('/users', { onRequest: [verifyUserRole('ADMIN')] }, list)
}
