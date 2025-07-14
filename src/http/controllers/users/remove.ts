import type { FastifyReply, FastifyRequest } from 'fastify'

import { UserNotExistsError } from '@/services/errors/user-not-exists-error'
import { makeRemoveService } from '@/services/factories/users/make-remove-service'

import { logout } from './logout'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const id = request.user.sub

  try {
    const removeService = makeRemoveService()

    await removeService.execute({ id })

    await logout(request, reply)
  } catch (err) {
    if (err instanceof UserNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(204).send()
}
