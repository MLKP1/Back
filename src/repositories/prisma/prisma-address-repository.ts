import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export class PrismaAddressRepository {
  async create(userId: string, data: Prisma.AddressCreateInput) {
    const address = await prisma.address.create({
      data: {
        ...data,
        user: {
          connect: { id: userId },
        },
      },
    })

    return address
  }

  async findByUserId(userId: string) {
    const address = await prisma.address.findFirst({
      where: {
        userId,
      },
    })

    return address
  }

  async updateByUserId(userId: string, data: Prisma.AddressUpdateInput) {
    const address = await prisma.address.update({
      where: {
        userId,
      },
      data,
    })

    return address
  }

  async list() {
    const address = await prisma.address.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    })

    return address
  }

  async removeByUserId(userId: string) {
    const address = await prisma.address.delete({
      where: {
        userId,
      },
    })

    return address
  }
}
