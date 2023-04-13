import type { FastifyPluginCallback } from 'fastify'
import { UserController } from '@controllers/user.controller'

const UserRouter: FastifyPluginCallback = async (app) => {
  const userController = UserController(app)

  app.route({
    method: 'POST',
    url: '/user/signup',
    handler: userController.signUp,
  })

  app.route({
    method: 'POST',
    url: '/user/signin',
    handler: userController.signIn,
  })
}

export { UserRouter }
