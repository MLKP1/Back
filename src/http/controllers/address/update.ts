import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { AddressNotExistsError } from '@/services/errors/address-not-exists-error'
import { makeUpdateService } from '@/services/factories/addresses/make-update-service'
import { getAddressByZipCode } from '@/utils/get-address-by-zipcode'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z
    .object({
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
        )
        .optional(),
      number: z.number().int().nonnegative().min(100).max(99999).optional(),
      complement: z.string().optional(),
    })
    .refine(
      data => {
        if (data.zipCode !== undefined && data.number === undefined) {
          return false
        }

        return (
          data.zipCode !== undefined ||
          data.number !== undefined ||
          data.complement !== undefined
        )
      },
      {
        message:
          'Se zipCode for fornecido, number também deve ser fornecido. Pelo menos um campo deve ser fornecido.',
      },
    )

  const userId = request.user.sub
  const parsedBody = updateBodySchema.parse(request.body)
  const { zipCode } = parsedBody

  let addressApi = null
  try {
    if (zipCode) {
      addressApi = await getAddressByZipCode(zipCode)
    }
  } catch (err) {
    return reply.status(400).send({
      message: (err as Error).message,
    })
  }

  let address = null
  try {
    const updateService = makeUpdateService()

    address = await updateService.execute({
      userId,
      data: { ...parsedBody, addressApi },
    })
  } catch (err) {
    if (err instanceof AddressNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send(address)
}
