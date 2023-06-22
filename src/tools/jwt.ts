import type { FastifyReply, FastifyRequest } from 'fastify'
import type { User, UserRequest } from './types'
import { comparePassword } from './bcrypt'
import { dbInstance } from '@tools/db'

const verifyJWTandLevel = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await request.jwtVerify()
  } catch (error) {
    reply.unauthorized()
  }
}

const verifyUserAndPassword = async (
  request: FastifyRequest<UserRequest['SIGN_IN']>,
  reply: FastifyReply
) => {
  const { email, password } = request.body

  const user: User | undefined = await dbInstance?.('users')
    .where('email', email)
    .first()
  const passwordIsCorrect = await comparePassword(password, user?.password)
  const isAuthorized = !!user && passwordIsCorrect

  if (!isAuthorized) reply.unauthorized()
}

export { verifyJWTandLevel, verifyUserAndPassword }
