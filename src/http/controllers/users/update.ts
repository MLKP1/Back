import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserNotExistsError } from '@/services/errors/user-not-exists-error'
import { makeUpdateService } from '@/services/factories/users/make-update-service'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z
    .object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6),
      role: z.enum(['CUSTOMER', 'EMPLOYEE', 'ADMIN']),
    })
    .partial()
    .refine(data => Object.keys(data).length > 0, {
      message: 'At least one field must be provided for update',
    })

  const id = request.user.sub
  const data = updateBodySchema.parse(request.body)

  let user = null
  try {
    const updateService = makeUpdateService()

    user = await updateService.execute({ id, data })
  } catch (err) {
    if (err instanceof UserNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send({
    user: {
      ...user,
      password: undefined,
    },
  })
}
