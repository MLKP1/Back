import type { FastifyInstance } from 'fastify'

import { getPizzas } from './getPizzas'
import { getDrinks } from './getDrinks'

export async function productsRoutes(app: FastifyInstance) {
  app.get('/pizzas', getPizzas)
  app.get('/drinks', getDrinks)
}
