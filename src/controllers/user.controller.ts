import type { FastifyInstance } from 'fastify'
import type { UserControllerLike } from '@tools/types'
import { comparePassword } from '@tools/bcrypt'
import { UserService } from '@services/user.service'

const UserController = (fastify: FastifyInstance) => {
  const userService = UserService()

  const signUp: UserControllerLike['SIGN_UP'] = async (request, reply) => {
    // const newUser = request.body
    // const userAlreadyExists = await userService.getByEmail(newUser.email)
    // if (userAlreadyExists) reply.conflict('User already exists')
    // const addedUser = await userService.add(newUser)
    // reply.send(addedUser)
  }

  const signIn: UserControllerLike['SIGN_IN'] = async (request, reply) => {
    // const user = request.body
    // const actualUser = await userService.getByEmail(user.email)
    // const passwordIsCorrect = await comparePassword(
    //   user.password,
    //   actualUser?.password
    // )
    // if (!actualUser || !passwordIsCorrect) {
    //   reply.unauthorized('Incorrect email or password')
    //   return
    // }
    // const token = await fastify.jwt.sign({ email: user.email })
    // reply.header('Authorization', `Bearer ${token}`).send({ user: actualUser })
  }

  return {
    signUp,
    signIn,
  }
}

export { UserController }
