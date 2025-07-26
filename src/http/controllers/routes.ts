import type { FastifyInstance } from 'fastify'

import { addressRoutes } from './address/routes'
import { usersRoutes } from './users/routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(addressRoutes)
}
