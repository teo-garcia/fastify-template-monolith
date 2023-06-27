import { FastifyInstance } from 'fastify'
import { UsersController } from '@controllers/users.controller'
import { UsersSchema } from '@schemas/users.schema'
import { verifyAdmin } from '@tools/jwt'

class UsersRouter {
  private app: FastifyInstance

  constructor(app: FastifyInstance) {
    this.app = app
  }

  public registerRoutes(): void {
    const userController = new UsersController(this.app)

    this.app.route({
      method: 'GET',
      url: '/users',
      handler: userController.getAll,
      schema: UsersSchema.getAll,
      preHandler: this.app.auth([this.app.verifyJWT, verifyAdmin]),
    })

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

    this.app.route({
      method: 'PATCH',
      url: '/users/update',
      handler: userController.update,
      schema: UsersSchema.update,
      preHandler: this.app.auth([
        this.app.verifyJWT,
        this.app.verifyUserAndPassword,
      ]),
    })
  }
}

export { UsersRouter }
