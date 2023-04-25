import type { FastifyPluginCallback } from 'fastify'
import { UsersController } from '@controllers/users.controller'
import { UsersSchema } from '@schemas/users.schema'

const UsersRouter: FastifyPluginCallback = async (app) => {
  const userController = UsersController(app)

  app.route({
    method: 'POST',
    url: '/users/signup',
    handler: userController.signUp,
    schema: UsersSchema.signUp,
  })

  app.route({
    method: 'POST',
    url: '/users/signin',
    handler: userController.signIn,
    schema: UsersSchema.signIn,
  })
}

export { UsersRouter }
