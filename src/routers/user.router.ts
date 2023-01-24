import type { FastifyPluginCallback } from 'fastify'
import { UserController } from '@controllers/user.controller'

const UserRouter: FastifyPluginCallback = async (fastify) => {
  const userController = UserController(fastify)

  fastify.route({
    method: 'POST',
    url: '/user/signup',
    handler: userController.signUp,
  })

  fastify.route({
    method: 'POST',
    url: '/user/signin',
    handler: userController.signIn,
  })
}

export { UserRouter }
