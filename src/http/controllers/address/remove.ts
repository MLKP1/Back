import type { FastifyReply, FastifyRequest } from 'fastify'

import { AddressNotExistsError } from '@/services/errors/address-not-exists-error'
import { makeRemoveService } from '@/services/factories/addresses/make-remove-service'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub
  try {
    const removeService = makeRemoveService()

    await removeService.execute({ userId })
  } catch (err) {
    if (err instanceof AddressNotExistsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(204).send()
}
