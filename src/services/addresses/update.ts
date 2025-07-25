import type { AddressRepository } from '@/repositories/address-repository'
import { AddressNotExistsError } from '../errors/address-not-exists-error'

interface UpdateServiceRequest {
  userId: string
  data: {
    zipCode?: number
    number?: number
    complement?: string
  }
}

export class UpdateService {
  constructor(private addressRepository: AddressRepository) {}

  async execute({ userId, data }: UpdateServiceRequest) {
    const doesAddressExists = await this.addressRepository.findByUserId(userId)

    if (!doesAddressExists) {
      throw new AddressNotExistsError()
    }

    const address = await this.addressRepository.updateByUserId(userId, data)

    return { address }
  }
}
