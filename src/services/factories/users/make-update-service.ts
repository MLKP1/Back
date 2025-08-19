import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateService } from '@/services/users/update'

export function makeUpdateService() {
  const usersRepository = new PrismaUsersRepository()
  const updateService = new UpdateService(usersRepository)

  return updateService
}
