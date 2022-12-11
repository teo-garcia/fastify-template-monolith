import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import todoController from '../todo/todo.controller'

async function routes(fastify: FastifyInstance, options: Object) {
  fastify.route({
    method: 'GET',
    url: '/ping',
    handler: (request: FastifyRequest, reply: FastifyReply) => {
      reply.send({ reply: 'pong' })
    },
  })

  fastify.route({
    method: 'GET',
    url: '/todo/:id',
    handler: todoController.get,
  })

  fastify.route({
    method: 'GET',
    url: '/todo',
    handler: todoController.getAll,
  })

  fastify.route({
    method: 'POST',
    url: '/todo',
    handler: todoController.add,
  })

  fastify.route({
    method: 'PUT',
    url: '/todo',
    handler: todoController.update,
  })

  fastify.route({
    method: 'DELETE',
    url: '/todo/:id',
    handler: todoController.remove,
  })
}

export default routes
