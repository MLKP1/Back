import type { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserNotExistsError } from '../errors/user-not-exists-error'

interface UpdateServiceRequest {
  id: string
  data: {
    name?: string
    email?: string
    password?: string
    role?: 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN'
  }
}

export class UpdateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id, data }: UpdateServiceRequest) {
    const doesUserExists = await this.usersRepository.findById(id)

    if (!doesUserExists) {
      throw new UserNotExistsError()
    }

    if (data.password !== undefined) {
      const passwordHash = await hash(data.password, 10)
      data.password = passwordHash
    }

    const user = await this.usersRepository.updateById(id, data)

    return { user }
  }
}
