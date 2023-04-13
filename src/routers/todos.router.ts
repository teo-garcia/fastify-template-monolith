import type { FastifyPluginCallback } from 'fastify'
import { TodosController } from '@controllers/todos.controller'
import { TodosSchema } from '@schemas/todos.schema'

const TodosRouter: FastifyPluginCallback = async (app) => {
  const todosController = TodosController(app)

  app.route({
    method: 'GET',
    url: '/todos/:id',
    handler: todosController.get,
    schema: TodosSchema.get,
    preHandler: app.auth([app.verifyJWTandLevel, app.verifyUserAndPassword]),
  })

  app.route({
    method: 'GET',
    url: '/todos',
    handler: todosController.getAll,
    schema: TodosSchema.getAll,
    preHandler: app.auth([app.verifyJWTandLevel, app.verifyUserAndPassword]),
  })

  app.route({
    method: 'POST',
    url: '/todos',
    handler: todosController.add,
    schema: TodosSchema.add,
    preHandler: app.auth([app.verifyJWTandLevel, app.verifyUserAndPassword]),
  })

  app.route({
    method: 'PUT',
    url: '/todos/:id',
    handler: todosController.update,
    schema: TodosSchema.update,
    preHandler: app.auth([app.verifyJWTandLevel, app.verifyUserAndPassword]),
  })

  app.route({
    method: 'DELETE',
    url: '/todos/:id',
    handler: todosController.remove,
    schema: TodosSchema.remove,
    preHandler: app.auth([app.verifyJWTandLevel, app.verifyUserAndPassword]),
  })
}

export { TodosRouter }
