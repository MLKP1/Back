import type { FastifyReply, FastifyRequest } from 'fastify'

type Role = 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN'

const roleHierarchy: Record<Role, Role[]> = {
  ADMIN: ['ADMIN', 'EMPLOYEE', 'CUSTOMER'],
  EMPLOYEE: ['EMPLOYEE', 'CUSTOMER'],
  CUSTOMER: ['CUSTOMER'],
}

export function verifyUserRole(roleToVerify: Role) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    await request.jwtVerify()
    const { role } = request.user

    const allowedRoles = roleHierarchy[role]

    if (!allowedRoles.includes(roleToVerify)) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
