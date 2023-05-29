import { FastifyInstance } from 'fastify'
import { UsersController } from '@controllers/users.controller'
import { UsersSchema } from '@schemas/users.schema'

class UsersRouter {
  private app: FastifyInstance

  constructor(app: FastifyInstance) {
    this.app = app
  }

  public registerRoutes(): void {
    const userController = new UsersController(this.app)

    this.app.route({
      method: 'POST',
      url: '/users/signup',
      handler: userController.signUp,
      schema: UsersSchema.signUp,
    })

    this.app.route({
      method: 'POST',
      url: '/users/signin',
      handler: userController.signIn,
      schema: UsersSchema.signIn,
    })
  }
}

export { UsersRouter }
