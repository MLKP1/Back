import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CodeGeneratedRecentlyError } from '@/services/errors/code-generated-recently-error'
import { UnableToSendEmailError } from '@/services/errors/unable-to-send-email-error'
import { UserNotExistsError } from '@/services/errors/user-not-exists-error'
import { makeSendCodeService } from '@/services/factories/users/make-send-code-service'

export async function sendCode(request: FastifyRequest, reply: FastifyReply) {
  const sendCodeBodySchema = z.object({
    email: z.string().email(),
  })

  const { email } = sendCodeBodySchema.parse(request.body)

  try {
    const sendCodeService = makeSendCodeService()
    const emailSent = await sendCodeService.execute({ email })

    return reply.status(200).send(emailSent)
  } catch (err) {
    if (err instanceof UserNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof CodeGeneratedRecentlyError) {
      return reply.status(429).send({ message: err.message })
    }

    if (err instanceof UnableToSendEmailError) {
      return reply.status(503).send({ message: err.message })
    }

    throw err
  }
}
