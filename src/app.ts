import { fastifyCookie } from '@fastify/cookie'
import { fastifyCors } from '@fastify/cors'
import { fastifyJwt } from '@fastify/jwt'
import fastify, { type FastifyReply } from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'

import { appRoutes } from './http/controllers/routes'

export const app = fastify()

app.register(fastifyCors, {
  origin: (origin, cb) => {
    const allowedOrigins = [
      'http://localhost:5500',
      'https://mlkp1.github.io/Front2/',
    ]
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true)
      return
    }
    cb(new Error('Not allowed'), false)
  },
  credentials: true,
  methods: '*',
})

app.get('/', (_, reply: FastifyReply) => {
  return reply.status(200).send({
    message: 'Hello, World!',
  })
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(appRoutes, { prefix: '/api' })

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (error.message.includes("Can't reach database server")) {
    return reply.status(503).send({ message: 'Database error.' })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    console.error(error)
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
