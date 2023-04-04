import type { FastifyPluginCallback } from 'fastify'
import { TodosController } from '@controllers/todos.controller'
import { TodosSchema } from '@schemas/todos.schema'

const TodosRouter: FastifyPluginCallback = async (fastify) => {
  const todosController = TodosController(fastify)

  fastify.route({
    method: 'GET',
    url: '/todos/:id',
    handler: todosController.get,
    schema: TodosSchema.get,
  })

  fastify.route({
    method: 'GET',
    url: '/todos',
    handler: todosController.getAll,
    schema: TodosSchema.getAll,
  })

  fastify.route({
    method: 'POST',
    url: '/todos',
    handler: todosController.add,
    schema: TodosSchema.add,
  })

  fastify.route({
    method: 'PUT',
    url: '/todos/:id',
    handler: todosController.update,
    schema: TodosSchema.update,
  })

  fastify.route({
    method: 'DELETE',
    url: '/todos/:id',
    handler: todosController.remove,
    schema: TodosSchema.remove,
  })
}

export { TodosRouter }
