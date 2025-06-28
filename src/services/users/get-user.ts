import type { UsersRepository } from '@/repositories/users-repository'
interface GetUserServiceRequest {
  userId: string
}

export class GetUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetUserServiceRequest) {
    const user = await this.usersRepository.findById(userId)

    return { user }
  }
}
