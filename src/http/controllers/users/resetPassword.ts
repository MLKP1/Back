import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeResetPasswordService } from '@/services/factories/users/make-reset-password-service'

export async function resetPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const resetPasswordBodySchema = z.object({
    code: z.number().int().min(100000).max(999999),
    password: z.string().min(6),
    userId: z.string().cuid(),
  })

  const { code, password, userId } = resetPasswordBodySchema.parse(request.body)

  try {
    const resetPasswordService = makeResetPasswordService()

    await resetPasswordService.execute({ code, password, userId })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(204).send()
}
