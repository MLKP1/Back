import type { UsersRepository } from '@/repositories/users-repository'
import { UserNotExistsError } from '../errors/user-not-exists-error'

export class ListService {
  constructor(private usersRepository: UsersRepository) {}

  async execute() {
    const users = await this.usersRepository.list()

    if (!users) {
      throw new UserNotExistsError()
    }

    return { users }
  }
}
