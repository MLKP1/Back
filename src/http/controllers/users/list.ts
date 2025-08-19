import type { FastifyReply, FastifyRequest } from 'fastify'

import { UserNotExistsError } from '@/services/errors/user-not-exists-error'
import { makeListService } from '@/services/factories/users/make-list-service'

export async function list(_: FastifyRequest, reply: FastifyReply) {
  let users = null
  try {
    const listService = makeListService()

    users = await listService.execute()
  } catch (err) {
    if (err instanceof UserNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send(users)
}
