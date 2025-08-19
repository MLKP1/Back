import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserService } from '@/services/users/get-user'

export function makeGetUserService() {
  const usersRepository = new PrismaUsersRepository()
  const getUserService = new GetUserService(usersRepository)

  return getUserService
}
