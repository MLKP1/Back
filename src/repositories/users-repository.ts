import type { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  list(): Promise<User[]>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  updateById(id: string, data: Prisma.UserUpdateInput): Promise<User>
  removeById(id: string): Promise<User>
}
