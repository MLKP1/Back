import type { Address, Prisma } from '@prisma/client'

export interface AddressRepository {
  create(userId: string, data: Prisma.AddressCreateInput): Promise<Address>
  findByUserId(userId: string): Promise<Address | null>
  updateByUserId(
    userId: string,
    data: Prisma.AddressUpdateInput,
  ): Promise<Address>
  removeByUserId(userId: string): Promise<Address>
  list(): Promise<Address[]>
}
