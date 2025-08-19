import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { AddressAlreadyExistsError } from '@/services/errors/address-already-exists-error'
import { UserNotExistsError } from '@/services/errors/user-not-exists-error'
import { makeRegisterService } from '@/services/factories/addresses/make-register-service'
import {
  type AddressApiResponse,
  getAddressByZipCode,
} from '@/utils/get-address-by-zipcode'
import { validateAddressFromApi } from '@/utils/validate-address'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    number: z.number().int().nonnegative().min(100).max(99999),
    street: z.string().nonempty(),
    neighborhood: z.string().nonempty(),
    complement: z.string().optional(),
    city: z.string().nonempty(),
    zipCode: z
      .number()
      .int()
      .min(10000000)
      .max(99999999)
      .refine(
        zip => {
          const prefix = Number.parseInt(zip.toString().substring(0, 2))
          return prefix >= 1 && prefix <= 19
        },
        {
          message: 'CEP não pertence ao estado de São Paulo',
        },
      ),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
  })

  const parsedBody = registerBodySchema.parse(request.body)
  let { zipCode, latitude, longitude, street, neighborhood, city } = parsedBody

  let addressData: AddressApiResponse
  try {
    addressData = await getAddressByZipCode(zipCode)
  } catch (err) {
    return reply.status(400).send({
      message: (err as Error).message,
    })
  }

  if (!latitude || !longitude) {
    latitude = addressData.latitudeApi
    longitude = addressData.longitudeApi
  }

  try {
    validateAddressFromApi(
      { zipCode, street, neighborhood, city, latitude, longitude },
      addressData,
    )
  } catch (err) {
    return reply.status(400).send({ message: (err as Error).message })
  }

  try {
    const registerService = makeRegisterService()

    await registerService.execute({
      ...parsedBody,
      userId: request.user.sub,
      latitude,
      longitude,
    })
  } catch (err) {
    if (err instanceof UserNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof AddressAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
