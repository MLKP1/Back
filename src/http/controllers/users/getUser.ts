import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserService } from '@/services/factories/make-get-user-service'

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  const getUser = makeGetUserService()

  const { user } = await getUser.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password: undefined,
    },
  })
}
