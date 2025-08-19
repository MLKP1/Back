import { PrismaAddressRepository } from '@/repositories/prisma/prisma-address-repository'
import { GetAddressService } from '@/services/addresses/get-address'

export function makeGetAddressService() {
  const addressRepository = new PrismaAddressRepository()
  const getAddressService = new GetAddressService(addressRepository)

  return getAddressService
}
