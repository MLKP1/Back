import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async list() {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return users
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async updateById(id: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: { id },
      data,
    })

    return user
  }

  async removeById(id: string) {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    })

    return user
  }
}
