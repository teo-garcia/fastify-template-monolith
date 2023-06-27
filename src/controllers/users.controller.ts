import { FastifyInstance } from 'fastify'
import type { User, UserControllerLike } from '@tools/types'
import { UsersService } from '@services/users.service'
import { comparePassword } from '@tools/bcrypt'

class UsersController {
  private app: FastifyInstance
  private userService: UsersService

  constructor(app: FastifyInstance) {
    this.app = app
    this.userService = new UsersService(this.app)
  }

  getAll: UserControllerLike['GET_ALL'] = async (request, reply) => {
    const todos = await this.userService.getAll()
    reply.send(todos)
  }

  public signUp: UserControllerLike['SIGN_UP'] = async (request, reply) => {
    const newUser: Omit<User, 'id'> = request.body
    const userAlreadyExists = await this.userService.getByEmail(newUser.email)

    if (userAlreadyExists) {
      reply.conflict('User already exists')
      return
    }

    await this.userService.add(newUser)
    reply.code(201).send()
  }

  public signIn: UserControllerLike['SIGN_IN'] = async (request, reply) => {
    const userInfo = request.body
    const user = await this.userService.getByEmail(userInfo.email)

    if (!user) {
      reply.unauthorized('Incorrect email or password')
      return
    }

    const passwordIsCorrect = await comparePassword(
      userInfo.password,
      user.password
    )

    if (!passwordIsCorrect) {
      reply.unauthorized('Incorrect email or password')
      return
    }

    const token = await this.app.jwt.sign({ id: user.id })
    reply.header('authorization', `Bearer ${token}`).send()
  }

  public update: UserControllerLike['UPDATE'] = async (request, reply) => {
    const userId = (request.user as User).id
    const updatedUser: Partial<User> = request.body

    if (!userId) {
      reply.unauthorized('User not logged in')
      return
    }

    await this.userService.update(userId, updatedUser)
    reply.code(204).send()
  }
}

export { UsersController }
