import type { AddressRepository } from '@/repositories/address-repository'
import type { AddressApiResponse } from '@/utils/get-address-by-zipcode'
import { AddressNotExistsError } from '../errors/address-not-exists-error'

interface UpdateServiceRequest {
  userId: string
  data: {
    zipCode?: number
    number?: number
    complement?: string
    addressApi: AddressApiResponse | null
  }
}

export class UpdateService {
  constructor(private addressRepository: AddressRepository) {}

  async execute({ userId, data }: UpdateServiceRequest) {
    const doesAddressExists = await this.addressRepository.findByUserId(userId)

    if (!doesAddressExists) {
      throw new AddressNotExistsError()
    }

    let address = null
    if (data.zipCode !== undefined && data.addressApi !== null) {
      address = await this.addressRepository.updateByUserId(userId, {
        zipCode: data.zipCode,
        number: data.number,
        complement: data.complement,
        neighborhood: data.addressApi.neighborhoodApi,
        street: data.addressApi.streetApi,
        city: data.addressApi.cityApi,
        latitude: data.addressApi.latitudeApi,
        longitude: data.addressApi.longitudeApi,
      })
    }

    if (data.zipCode === undefined) {
      address = await this.addressRepository.updateByUserId(userId, {
        number: data.number,
        complement: data.complement,
      })
    }

    return { address }
  }
}
