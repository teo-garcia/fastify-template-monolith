import { FastifyInstance } from 'fastify'
import { TodosService } from '@services/todos.service'
import { TodosControllerLike } from '@tools/types'

class TodosController {
  private readonly todosService: TodosService

  constructor(private readonly app: FastifyInstance) {
    this.todosService = new TodosService(app)
  }

  get: TodosControllerLike['GET'] = async (request, reply) => {
    console.log(request.user)
    const { id } = request.params
    const todo = await this.todosService.get(id, 1)
    if (!todo) reply.notFound()
    reply.send(todo)
  }

  getAll: TodosControllerLike['GET_ALL'] = async (request, reply) => {
    const userId = (request.user as any).id // TODO: Fix this
    const todos = await this.todosService.getAll(userId)
    reply.send(todos)
  }

  add: TodosControllerLike['ADD'] = async (request, reply) => {
    const newTodo = request.body
    await this.todosService.add(newTodo)
    reply.code(201)
  }

  update: TodosControllerLike['UPDATE'] = async (request, reply) => {
    const { id } = request.params
    console.log(request.user)

    const targetTodo = await this.todosService.get(id, 1)
    if (!targetTodo) reply.notFound()
    const updatedTodo = await this.todosService.update(id, request.body)
    reply.send(updatedTodo)
  }

  remove: TodosControllerLike['REMOVE'] = async (request, reply) => {
    const { id } = request.params
    const targetTodo = await this.todosService.get(id, 1)
    if (!targetTodo) reply.notFound()
    await this.todosService.remove(id)
    reply.code(204).send()
  }
}

export { TodosController }
