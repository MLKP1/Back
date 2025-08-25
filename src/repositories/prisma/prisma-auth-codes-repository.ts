import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export class PrismaAuthCodesRepository {
  async create(data: Prisma.AuthCodesCreateInput) {
    const authCode = await prisma.authCodes.create({
      data,
    })

    return authCode
  }

  async list() {
    const authCodes = await prisma.authCodes.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return authCodes
  }

  async getByCodeAndUser(userId: string, code: number) {
    const authCode = await prisma.authCodes.findFirst({
      where: {
        userId,
        AND: {
          code,
        },
      },
    })

    return authCode
  }

  async getLastCodeByUser(userId: string) {
    const authCode = await prisma.authCodes.findFirst({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return authCode
  }

  async deleteByCode(code: number) {
    const authCode = await prisma.authCodes.delete({
      where: {
        code,
      },
    })

    return authCode
  }
}
