import type { FastifyReply, FastifyRequest } from 'fastify'
import type { User, UserRequest } from './types'
import { comparePassword } from './bcrypt'
import { dbInstance } from '@tools/db'

const verifyJWT = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify()
  } catch (error) {
    reply.unauthorized()
  }
}

const verifyAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = (request.user as User).id
  const user = await dbInstance?.('users').where('id', userId).first()

  if (!user || user.role !== 'admin') {
    reply.unauthorized('Insufficient privileges')
    return
  }
}

const verifyUserAndPassword = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { email, password } = request.body as UserRequest['SIGN_IN']['Body']
  const user: User | undefined = await dbInstance?.('users')
    .where('email', email)
    .first()
  const passwordIsCorrect = await comparePassword(password, user?.password)
  const isAuthenticated = !!user && passwordIsCorrect

  if (!isAuthenticated) reply.unauthorized()
}

export { verifyJWT, verifyAdmin, verifyUserAndPassword }
