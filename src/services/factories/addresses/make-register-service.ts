import { PrismaAddressRepository } from '@/repositories/prisma/prisma-address-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterService } from '@/services/addresses/register'

export function makeRegisterService() {
  const addressRepository = new PrismaAddressRepository()
  const usersRepository = new PrismaUsersRepository()

  const registerService = new RegisterService(
    addressRepository,
    usersRepository,
  )

  return registerService
}
