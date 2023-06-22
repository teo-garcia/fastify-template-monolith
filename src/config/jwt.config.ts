import type { FastifyJWTOptions } from '@fastify/jwt'
import { User } from '@tools/types'

const JwtConfig = {
  secret: process.env.JWT_SECRET as string,
  formatUser: (user) => {
    return {
      id: (user as User).id,
    }
  },
} satisfies FastifyJWTOptions

export { JwtConfig }
