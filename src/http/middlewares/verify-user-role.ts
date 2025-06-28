import type { FastifyReply, FastifyRequest } from 'fastify'

type Role = 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN'

const roleHierarchy: Record<Role, Role[]> = {
  ADMIN: ['ADMIN', 'EMPLOYEE', 'CUSTOMER'],
  EMPLOYEE: ['EMPLOYEE', 'CUSTOMER'],
  CUSTOMER: ['CUSTOMER'],
}

export function verifyUserRole(roleToVerify: Role) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
    const { role } = request.user

    const allowedRoles = roleHierarchy[role]

    if (!allowedRoles.includes(roleToVerify)) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
