import { fakerPT_BR as faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { prisma } from '../src/lib/prisma'

console.time('time')

async function seed() {
  await prisma.cart.deleteMany()
  await prisma.order.deleteMany()
  await prisma.address.deleteMany()
  await prisma.user.deleteMany()
  await prisma.dessert.deleteMany()
  await prisma.drink.deleteMany()
  await prisma.pizza.deleteMany()

  const admin = await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      name: 'Admin',
      password: await hash('dnx42697', 10),
      role: 'ADMIN',
    },
  })

  const users = await Promise.all(
    Array.from({
      length: faker.number.int({ min: 250, max: 300 }),
    }).map(async () => {
      return await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: await hash(faker.internet.password(), 10),
          createdAt: faker.date.recent({ days: 40 }),
          updatedAt: faker.date.recent({ days: 30 }),
        },
      })
    }),
  )

  const usersUsedForAddress: typeof users = []
  await Promise.all(
    Array.from({
      length: faker.number.int({ min: 80, max: 120 }),
    }).map(async () => {
      let randomUser: (typeof users)[0]
      do {
        randomUser = faker.helpers.arrayElement(users)
      } while (usersUsedForAddress.some(user => user.id === randomUser.id))

      usersUsedForAddress.push(randomUser)

      return await prisma.address.create({
        data: {
          city: faker.location.city(),
          complement: faker.helpers.arrayElement(['casa', 'apartamento']),
          street: faker.location.street(),
          neighborhood: faker.location.secondaryAddress(),
          number: Number.parseInt(faker.location.buildingNumber()),
          zipCode: faker.location.zipCode(),
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          userId: randomUser.id,
          createdAt: faker.date.recent({ days: 40 }),
          updatedAt: faker.date.recent({ days: 30 }),
        },
      })
    }),
  )

  const pizzas = await Promise.all(
    Array.from({
      length: faker.number.int({ min: 50, max: 100 }),
    }).map(async () => {
      return await prisma.pizza.create({
        data: {
          name: faker.food.dish(),
          size: faker.helpers.arrayElement(['MEDIUM', 'LARGE', 'FAMILY']),
          type: faker.helpers.arrayElement(['SWEET', 'SALTY']),
          price: Number.parseInt(
            faker.commerce.price({ dec: 0, min: 1000, max: 20000 }),
          ),
          description: faker.food.description(),
          createdAt: faker.date.recent({ days: 40 }),
          updatedAt: faker.date.recent({ days: 30 }),
        },
      })
    }),
  )

  const drinks = await Promise.all(
    Array.from({
      length: faker.number.int({ min: 50, max: 100 }),
    }).map(async () => {
      return await prisma.drink.create({
        data: {
          name: faker.food.dish(),
          price: Number.parseInt(
            faker.commerce.price({ dec: 0, min: 1000, max: 20000 }),
          ),
          type: faker.helpers.arrayElement(['SODA', 'JUICE', 'ALCOHOLIC']),
          volume: 1000,
          description: faker.food.description(),
          createdAt: faker.date.recent({ days: 40 }),
          updatedAt: faker.date.recent({ days: 30 }),
        },
      })
    }),
  )

  const desserts = await Promise.all(
    Array.from({
      length: faker.number.int({ min: 50, max: 100 }),
    }).map(async () => {
      return await prisma.dessert.create({
        data: {
          name: faker.food.dish(),
          price: Number.parseInt(
            faker.commerce.price({ dec: 0, min: 1000, max: 20000 }),
          ),
          type: faker.helpers.arrayElement(['SWEET', 'SALTY']),
          size: 'grande',
          description: faker.food.description(),
          createdAt: faker.date.recent({ days: 40 }),
          updatedAt: faker.date.recent({ days: 30 }),
        },
      })
    }),
  )

  const usersUsedForCart: typeof users = []
  await Promise.all(
    Array.from({
      length: faker.number.int({ min: 10, max: 50 }),
    }).map(async () => {
      let randomUser: (typeof users)[0]
      do {
        randomUser = faker.helpers.arrayElement(users)
      } while (usersUsedForCart.some(user => user.id === randomUser.id))

      usersUsedForCart.push(randomUser)

      const cartPizzas = faker.helpers.arrayElements(
        pizzas,
        faker.number.int({ min: 0, max: 3 }),
      )
      const cartDrinks = faker.helpers.arrayElements(
        drinks,
        faker.number.int({ min: 0, max: 2 }),
      )
      const cartDesserts = faker.helpers.arrayElements(
        desserts,
        faker.number.int({ min: 0, max: 2 }),
      )

      const total = [
        ...cartPizzas.map(pizza => pizza.price),
        ...cartDrinks.map(drink => drink.price),
        ...cartDesserts.map(dessert => dessert.price),
      ].reduce((acc, curr) => acc + curr, 0)

      await prisma.cart.create({
        data: {
          userId: randomUser.id,
          total,
          pizzas: {
            connect: cartPizzas.map(pizza => ({ id: pizza.id })),
          },
          drinks: {
            connect: cartDrinks.map(drink => ({ id: drink.id })),
          },
          desserts: {
            connect: cartDesserts.map(dessert => ({ id: dessert.id })),
          },
          createdAt: faker.date.recent({ days: 40 }),
          updatedAt: faker.date.recent({ days: 30 }),
        },
      })
    }),
  )

  const usersUsedForOrder: typeof users = []
  await Promise.all(
    Array.from({
      length: faker.number.int({ min: 100, max: 150 }),
    }).map(async () => {
      let randomUser: (typeof users)[0]
      do {
        randomUser = faker.helpers.arrayElement(users)
      } while (usersUsedForOrder.some(user => user.id === randomUser.id))

      usersUsedForOrder.push(randomUser)

      const orderPizzas = faker.helpers.arrayElements(
        pizzas,
        faker.number.int({ min: 0, max: 3 }),
      )
      const orderDrinks = faker.helpers.arrayElements(
        drinks,
        faker.number.int({ min: 0, max: 2 }),
      )
      const orderDesserts = faker.helpers.arrayElements(
        desserts,
        faker.number.int({ min: 0, max: 2 }),
      )

      const total = [
        ...orderPizzas.map(pizza => pizza.price),
        ...orderDrinks.map(drink => drink.price),
        ...orderDesserts.map(dessert => dessert.price),
      ].reduce((acc, curr) => acc + curr, 0)

      await prisma.order.create({
        data: {
          userId: randomUser.id,
          status: faker.helpers.arrayElement([
            'PENDING',
            'PROCESSING',
            'DELIVERING',
            'DELIVERED',
            'CANCELLED',
          ]),
          total,
          pizzas: {
            connect: orderPizzas.map(pizza => ({ id: pizza.id })),
          },
          drinks: {
            connect: orderDrinks.map(drink => ({ id: drink.id })),
          },
          desserts: {
            connect: orderDesserts.map(dessert => ({ id: dessert.id })),
          },
          createdAt: faker.date.recent({ days: 40 }),
          updatedAt: faker.date.recent({ days: 30 }),
        },
      })
    }),
  )
}

seed()
  .then(() => {
    console.log('✔ Database seeded!')
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
    console.timeEnd('time')
  })
