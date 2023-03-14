import type { FastifyPluginCallback } from 'fastify'
import { TodoController } from '@controllers/todo.controller'
import { TodoSchema } from '@schemas/todo.schema'

const TodoRouter: FastifyPluginCallback = async (fastify) => {
  const todoController = TodoController()

  fastify.route({
    method: 'GET',
    url: '/todo/:id',
    handler: todoController.get,
    schema: TodoSchema.get,
    // preHandler: fastify.auth(fastify.verifyJwtToken),
  })

  fastify.route({
    method: 'GET',
    url: '/todo',
    handler: todoController.getAll,
    schema: TodoSchema.getAll,
  })

  fastify.route({
    method: 'POST',
    url: '/todo',
    handler: todoController.add,
    schema: TodoSchema.add,
  })

  fastify.route({
    method: 'PUT',
    url: '/todo',
    handler: todoController.update,
    schema: TodoSchema.update,
  })

  fastify.route({
    method: 'DELETE',
    url: '/todo/:id',
    handler: todoController.remove,
    schema: TodoSchema.remove,
  })
}

export { TodoRouter }
