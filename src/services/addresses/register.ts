import type { AddressRepository } from '@/repositories/address-repository'
import type { UsersRepository } from '@/repositories/users-repository'
import { AddressAlreadyExistsError } from '../errors/address-already-exists-error'
import { UserNotExistsError } from '../errors/user-not-exists-error'

interface RegisterServiceRequest {
  number: number
  street: string
  neighborhood: string
  complement?: string
  city: string
  state?: string
  country?: string
  zipCode: number
  latitude: number
  longitude: number

  userId: string
}

export class RegisterService {
  constructor(
    private addressRepository: AddressRepository,
    private userRepository: UsersRepository,
  ) {}

  async execute({
    number,
    street,
    neighborhood,
    complement,
    city,
    state,
    country,
    zipCode,
    latitude,
    longitude,
    userId,
  }: RegisterServiceRequest) {
    const doesUserExists = await this.userRepository.findById(userId)

    if (!doesUserExists) {
      throw new UserNotExistsError()
    }

    const doesAddressAlreadyExists =
      await this.addressRepository.findByUserId(userId)

    if (doesAddressAlreadyExists) {
      throw new AddressAlreadyExistsError()
    }

    const address = await this.addressRepository.create(userId, {
      number,
      street,
      neighborhood,
      complement,
      city,
      state,
      country,
      zipCode,
      latitude,
      longitude,
      user: {
        connect: {
          id: userId,
        },
      },
    })

    return { address }
  }
}
