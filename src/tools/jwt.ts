import type { FastifyReply, FastifyRequest } from 'fastify'
import type { User, UserRequest } from './types'
import { comparePassword } from './bcrypt'

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

  const client = await request.pg
  const user: User = (
    await client?.query(`SELECT * FROM users WHERE email = $1`, [email])
  )?.rows[0]
  const passwordIsCorrect = await comparePassword(password, user?.password)
  const isAuthorized = !!user && passwordIsCorrect

  if (!isAuthorized) reply.unauthorized()
}

export { verifyJWTandLevel, verifyUserAndPassword }
