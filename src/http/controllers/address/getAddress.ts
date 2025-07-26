import type { FastifyReply, FastifyRequest } from 'fastify'

import { AddressNotExistsError } from '@/services/errors/address-not-exists-error'
import { makeGetAddressService } from '@/services/factories/addresses/make-get-address-service'

export async function getAddress(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  let address = null
  try {
    const getAddressService = makeGetAddressService()

    address = await getAddressService.execute({ userId })
  } catch (err) {
    if (err instanceof AddressNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send(address)
}
