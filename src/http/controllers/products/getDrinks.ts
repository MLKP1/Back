import type { FastifyReply, FastifyRequest } from 'fastify'
import { env } from '@/env'

interface GetDrinksQuery {
  pageIndex?: number | string
}

export async function getDrinks(request: FastifyRequest, reply: FastifyReply) {
  const cookie = env.API_TOKEN
  if (!cookie) return reply.status(401).send({ error: 'Sessão não encontrada' })

  const { pageIndex } = request.query as GetDrinksQuery

  const response = await fetch(
    `${env.API_URL}/products/drinks?active=true&pageIndex=${pageIndex || 0}`,
    {
      headers: {
        Cookie: cookie,
      },
    },
  )

  const drinks = await response.json()
  reply.send(drinks)
}
