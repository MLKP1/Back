import type { AuthCodes, Prisma } from '@prisma/client'

export interface AuthCodesRepository {
  create(data: Prisma.AuthCodesCreateInput): Promise<AuthCodes>
  list(): Promise<AuthCodes[]>
  getByCodeAndUser(userId: string, code: number): Promise<AuthCodes | null>
  getLastCodeByUser(userId: string): Promise<AuthCodes | null>
  deleteByCode(code: number): Promise<AuthCodes>
}
