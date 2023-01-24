import { FastifyJWTOptions } from '@fastify/jwt'

const JwtConfig = {
  secret: process.env.JWT_SECRET as string,
} satisfies FastifyJWTOptions

export { JwtConfig }
