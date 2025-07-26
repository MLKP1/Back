import type { AddressRepository } from '@/repositories/address-repository'

export class ListService {
  constructor(private addressRepository: AddressRepository) {}

  async execute() {
    const address = await this.addressRepository.list()

    return { address }
  }
}
