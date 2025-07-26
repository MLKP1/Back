import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeListService } from '@/services/factories/addresses/make-list-service'

export async function list(_: FastifyRequest, reply: FastifyReply) {
  let addresses = null
  try {
    const listService = makeListService()

    addresses = await listService.execute()
  } catch (err) {
    // biome-ignore lint/complexity/noUselessCatch: <is necessary to set the error>
    throw err
  }

  return reply.status(200).send({ addresses: addresses.address })
}
