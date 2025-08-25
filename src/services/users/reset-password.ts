import type { AuthCodesRepository } from '@/repositories/auth-codes-repository'
import type { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { UserNotExistsError } from '../errors/user-not-exists-error'

import { hash } from 'bcryptjs'
import dayjs from 'dayjs'

interface ResetPasswordServiceRequest {
  code: number
  userId: string
  password: string
}

export class ResetPasswordService {
  constructor(
    private usersRepository: UsersRepository,
    private authCodes: AuthCodesRepository,
  ) {}

  async execute({ code, userId, password }: ResetPasswordServiceRequest) {
    const isValidCode = await this.authCodes.getByCodeAndUser(userId, code)

    if (!isValidCode) {
      throw new InvalidCredentialsError()
    }

    const date = dayjs().diff(isValidCode.createdAt, 'milliseconds')
    const dateInHours = date / 1000 / 60 / 60
    const isCodeGeneratedMoreThanFiveHours = dateInHours >= 5

    if (isCodeGeneratedMoreThanFiveHours) {
      throw new InvalidCredentialsError()
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotExistsError()
    }

    password = await hash(password, 10)

    const alteredPassword = await this.usersRepository.updateById(user.id, {
      password,
    })

    await this.authCodes.deleteByCode(code)

    return { alteredPassword }
  }
}
