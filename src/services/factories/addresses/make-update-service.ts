import { PrismaAddressRepository } from '@/repositories/prisma/prisma-address-repository'
import { UpdateService } from '@/services/addresses/update'

export function makeUpdateService() {
  const addressRepository = new PrismaAddressRepository()
  const updateService = new UpdateService(addressRepository)

  return updateService
}
