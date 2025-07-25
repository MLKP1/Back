import type { AddressRepository } from '@/repositories/address-repository'
import { AddressNotExistsError } from '../errors/address-not-exists-error'

interface GetAddressServiceRequest {
  userId: string
}

export class GetAddressService {
  constructor(private addressRepository: AddressRepository) {}

  async execute({ userId }: GetAddressServiceRequest) {
    const address = await this.addressRepository.findByUserId(userId)

    if (!address) {
      throw new AddressNotExistsError()
    }

    return { address }
  }
}
