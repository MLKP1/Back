import type { UsersRepository } from '@/repositories/users-repository'
import { UserNotExistsError } from '../errors/user-not-exists-error'

interface RemoveServiceRequest {
  id: string
}

export class RemoveService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: RemoveServiceRequest) {
    const doesUserExists = await this.usersRepository.findById(id)

    if (!doesUserExists) {
      throw new UserNotExistsError()
    }

    const user = await this.usersRepository.removeById(id)

    return { user }
  }
}
