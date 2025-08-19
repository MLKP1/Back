import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RemoveService } from '../../users/remove'

export function makeRemoveService() {
  const usersRepository = new PrismaUsersRepository()
  const removeService = new RemoveService(usersRepository)

  return removeService
}
