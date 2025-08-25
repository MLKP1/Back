import { PrismaAuthCodesRepository } from '@/repositories/prisma/prisma-auth-codes-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ResetPasswordService } from '@/services/users/reset-password'

export function makeResetPasswordService() {
  const usersRepository = new PrismaUsersRepository()
  const authCodesRepository = new PrismaAuthCodesRepository()

  const resetPasswordService = new ResetPasswordService(
    usersRepository,
    authCodesRepository,
  )

  return resetPasswordService
}
