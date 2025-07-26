import { PrismaAddressRepository } from '@/repositories/prisma/prisma-address-repository'
import { ListService } from '@/services/addresses/list'

export function makeListService() {
  const addressRepository = new PrismaAddressRepository()
  const listService = new ListService(addressRepository)

  return listService
}
