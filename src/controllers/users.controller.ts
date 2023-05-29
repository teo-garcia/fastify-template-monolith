import { FastifyInstance } from 'fastify'
import { UserControllerLike } from '@tools/types'
import { UsersService } from '@services/users.service'
import { comparePassword } from '@tools/bcrypt'

class UsersController {
  private app: FastifyInstance
  private userService: UsersService

  constructor(app: FastifyInstance) {
    this.app = app
    this.userService = new UsersService(app)
  }

  public signUp: UserControllerLike['SIGN_UP'] = async (request, reply) => {
    const newUser = request.body
    const userAlreadyExists = await this.userService.getByEmail(newUser.email)

    if (userAlreadyExists) {
      reply.conflict('User already exists')
      return
    }

    const addedUser = await this.userService.add(newUser)
    reply.send(addedUser)
  }

  public signIn: UserControllerLike['SIGN_IN'] = async (request, reply) => {
    const userInfo = request.body
    const user = await this.userService.getByEmail(userInfo.email)
    const passwordIsCorrect = await comparePassword(
      userInfo.password,
      user?.password
    )
    const isNotAuthenticated = ![user, passwordIsCorrect].some(Boolean)

    if (isNotAuthenticated) {
      reply.unauthorized('Incorrect email or password')
      return
    }

    const token = await this.app.jwt.sign({ id: user?.id })
    reply.header('authorization', `Bearer ${token}`).status(200)
  }
}

export { UsersController }
