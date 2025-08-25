import { PrismaAuthCodesRepository } from '@/repositories/prisma/prisma-auth-codes-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { SendCodeService } from '@/services/users/send-code'

export function makeSendCodeService() {
  const usersRepository = new PrismaUsersRepository()
  const authCodesRepository = new PrismaAuthCodesRepository()

  const sendCodeService = new SendCodeService(
    usersRepository,
    authCodesRepository,
  )

  return sendCodeService
}
