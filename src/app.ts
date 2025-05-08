import fastify, { type FastifyReply } from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.get('/', (_, reply: FastifyReply) => {
  return reply.status(200).send({
    message: 'Hello, World!',
  })
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    console.error(error)
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
