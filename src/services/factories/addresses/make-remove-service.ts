import { PrismaAddressRepository } from '@/repositories/prisma/prisma-address-repository'
import { RemoveService } from '@/services/addresses/remove'

export function makeRemoveService() {
  const addressRepository = new PrismaAddressRepository()
  const removeService = new RemoveService(addressRepository)

  return removeService
}
