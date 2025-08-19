import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

import { getAddress } from './getAddress'
import { list } from './list'
import { register } from './register'
import { remove } from './remove'
import { update } from './update'

export async function addressRoutes(app: FastifyInstance) {
  app.post('/address', { onRequest: [verifyJWT] }, register)
  app.get('/address', { onRequest: [verifyJWT] }, getAddress)
  app.patch('/address', { onRequest: [verifyJWT] }, update)
  app.delete('/address', { onRequest: [verifyJWT] }, remove)

  app.get('/addresses', { onRequest: [verifyUserRole('ADMIN')] }, list)
}
