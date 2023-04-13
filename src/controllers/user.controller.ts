import type { FastifyInstance } from 'fastify'
import type { UserControllerLike } from '@tools/types'
import { UserService } from '@services/user.service'
import { comparePassword } from '@tools/bcrypt'

const UserController = (app: FastifyInstance) => {
  const userService = UserService(app)

  const signUp: UserControllerLike['SIGN_UP'] = async (request, reply) => {
    const newUser = request.body
    const userAlreadyExists = await userService.getByEmail(newUser.email)

    if (userAlreadyExists) {
      reply.conflict('User already exists')
      return
    }

    const addedUser = await userService.add(newUser)
    reply.send(addedUser)
  }

  const signIn: UserControllerLike['SIGN_IN'] = async (request, reply) => {
    const userInfo = request.body
    const user = await userService.getByEmail(userInfo.email)
    const passwordIsCorrect = await comparePassword(
      userInfo.password,
      user?.password
    )
    const isNotAuthenticated = ![user, passwordIsCorrect].some(Boolean)

    if (isNotAuthenticated) {
      reply.unauthorized('Incorrect email or password')
      return
    }
    const token = await app.jwt.sign({ id: user?.id })
    reply.header('Authorization', `Bearer ${token}`).status(200)
  }

  return {
    signUp,
    signIn,
  }
}

export { UserController }
