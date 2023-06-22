import { FastifyInstance } from 'fastify'
import { TodosService } from '@services/todos.service'
import { TodosControllerLike, User } from '@tools/types'

class TodosController {
  private readonly todosService: TodosService

  constructor(private readonly app: FastifyInstance) {
    this.app = app
    this.todosService = new TodosService(this.app)
  }

  get: TodosControllerLike['GET'] = async (request, reply) => {
    const { id } = request.params
    const userId = (request.user as User).id
    const todo = await this.todosService.get(id, userId)
    if (!todo) reply.notFound()
    reply.send(todo)
  }

  getAll: TodosControllerLike['GET_ALL'] = async (request, reply) => {
    const userId = (request.user as User).id
    const todos = await this.todosService.getAll(userId)
    reply.send(todos)
  }

  add: TodosControllerLike['ADD'] = async (request, reply) => {
    const userId = (request.user as User).id
    const newTodo = request.body
    await this.todosService.add(newTodo, userId)
    reply.code(201)
  }

  update: TodosControllerLike['UPDATE'] = async (request, reply) => {
    const { id } = request.params
    const userId = (request.user as User).id
    const targetTodo = await this.todosService.get(id, userId)
    if (!targetTodo) reply.notFound()
    const updatedTodo = await this.todosService.update(id, request.body)
    reply.send(updatedTodo)
  }

  remove: TodosControllerLike['REMOVE'] = async (request, reply) => {
    const { id } = request.params
    const userId = (request.user as User).id
    const targetTodo = await this.todosService.get(id, userId)
    if (!targetTodo) reply.notFound()
    await this.todosService.remove(id)
    reply.code(204).send()
  }
}

export { TodosController }
