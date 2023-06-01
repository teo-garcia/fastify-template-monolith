import type { FastifyInstance } from 'fastify'
import { TodosController } from '@controllers/todos.controller'
import { TodosSchema } from '@schemas/todos.schema'

class TodosRouter {
  private readonly app: FastifyInstance
  private readonly todosController: TodosController

  constructor(app: FastifyInstance) {
    this.app = app
    this.todosController = new TodosController(app)
  }

  registerRoutes(): void {
    this.app.route({
      method: 'GET',
      url: '/todos/:id',
      handler: this.todosController.get,
      schema: TodosSchema.get,
      preHandler: this.app.auth([
        this.app.verifyJWTandLevel,
        this.app.verifyUserAndPassword,
      ]),
    })

    this.app.route({
      method: 'GET',
      url: '/todos',
      handler: this.todosController.getAll,
      schema: TodosSchema.getAll,
      preHandler: this.app.auth([
        this.app.verifyJWTandLevel,
        this.app.verifyUserAndPassword,
      ]),
    })

    this.app.route({
      method: 'POST',
      url: '/todos',
      handler: this.todosController.add,
      schema: TodosSchema.add,
      preHandler: this.app.auth([
        this.app.verifyJWTandLevel,
        this.app.verifyUserAndPassword,
      ]),
    })

    this.app.route({
      method: 'PUT',
      url: '/todos/:id',
      handler: this.todosController.update,
      schema: TodosSchema.update,
      preHandler: this.app.auth([
        this.app.verifyJWTandLevel,
        this.app.verifyUserAndPassword,
      ]),
    })

    this.app.route({
      method: 'DELETE',
      url: '/todos/:id',
      handler: this.todosController.remove,
      schema: TodosSchema.remove,
      preHandler: this.app.auth([
        this.app.verifyJWTandLevel,
        this.app.verifyUserAndPassword,
      ]),
    })
  }
}

export { TodosRouter }
