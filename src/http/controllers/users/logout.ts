import type { FastifyReply, FastifyRequest } from 'fastify'

export async function logout(_: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie('refreshToken', { path: '/' })

  return reply.status(200).send()
}
