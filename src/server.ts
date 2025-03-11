import fastify, { type FastifyReply } from 'fastify'

const app = fastify()

app.get('/', (_, reply: FastifyReply) => {
  return reply.status(200).send({
    message: 'Hello, World!',
  })
})

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => {
    console.log('Server Running on 3333!')
  })
