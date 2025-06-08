import type { UsersRepository } from '@/repositories/users-repository'
import { UserNotExistsError } from '../errors/user-not-exists-error'

interface GetUserServiceRequest {
  email: string
}

export class GetUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email }: GetUserServiceRequest) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UserNotExistsError()
    }

    return { user }
  }
}
