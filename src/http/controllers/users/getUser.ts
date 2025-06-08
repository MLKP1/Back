import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserNotExistsError } from '@/services/errors/user-not-exists-error'
import { makeGetUserService } from '@/services/factories/make-get-user-service'

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  const getUserParamsSchema = z.object({
    email: z.string().email(),
  })

  const { email } = getUserParamsSchema.parse(request.params)

  let user = null
  try {
    const getUserService = makeGetUserService()

    user = await getUserService.execute({ email })
  } catch (err) {
    if (err instanceof UserNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send(user)
}
