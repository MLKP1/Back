import type { AddressRepository } from '@/repositories/address-repository'
import { AddressNotExistsError } from '../errors/address-not-exists-error'

interface RemoveServiceRequest {
  userId: string
}

export class RemoveService {
  constructor(private addressRepository: AddressRepository) {}

  async execute({ userId }: RemoveServiceRequest) {
    const doesAddressExists = await this.addressRepository.findByUserId(userId)

    if (!doesAddressExists) {
      throw new AddressNotExistsError()
    }

    const address = await this.addressRepository.removeByUserId(userId)

    return { address }
  }
}
