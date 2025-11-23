import type { FastifyReply, FastifyRequest } from 'fastify'
import { env } from '@/env'

interface GetPizzasQuery {
  pageIndex?: number | string
}

export async function getPizzas(request: FastifyRequest, reply: FastifyReply) {
  const cookie = env.API_TOKEN
  if (!cookie) return reply.status(401).send({ error: 'Sessão não encontrada' })

  const { pageIndex } = request.query as GetPizzasQuery

  const response = await fetch(
    `${env.API_URL}/products/pizzas?active=true&pageIndex=${pageIndex || 0}`,
    {
      headers: {
        Cookie: cookie,
      },
    },
  )

  const pizzas = await response.json()
  reply.send(pizzas)
}
