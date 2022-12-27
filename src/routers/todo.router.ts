import type { FastifyPluginCallback } from 'fastify'
import { TodoController } from '@controllers/todo.controller'
import { TodoSchema } from '@schemas/todo.schema'

const TodoRouter: FastifyPluginCallback = async (fastify) => {
  fastify.route({
    method: 'GET',
    url: '/todo/:id',
    handler: TodoController.get,
    schema: TodoSchema.get,
  })

  fastify.route({
    method: 'GET',
    url: '/todo',
    handler: TodoController.getAll,
    schema: TodoSchema.getAll,
  })

  fastify.route({
    method: 'POST',
    url: '/todo',
    handler: TodoController.add,
    schema: TodoSchema.add,
  })

  fastify.route({
    method: 'PUT',
    url: '/todo',
    handler: TodoController.update,
    schema: TodoSchema.update,
  })

  fastify.route({
    method: 'DELETE',
    url: '/todo/:id',
    handler: TodoController.remove,
    schema: TodoSchema.remove,
  })
}

export { TodoRouter }
