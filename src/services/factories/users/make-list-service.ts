import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ListService } from '@/services/users/list'

export function makeListService() {
  const usersRepository = new PrismaUsersRepository()
  const listService = new ListService(usersRepository)

  return listService
}
