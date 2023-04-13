import type { FastifyInstance } from 'fastify'
import type { TodosControllerLike } from '@tools/types'
import { TodosService } from '@services/todos.service'

const TodosController = (app: FastifyInstance) => {
  const todosService = TodosService(app)

  const get: TodosControllerLike['GET'] = async (request, reply) => {
    console.log(request.user)
    const { id } = request.params
    const todo = await todosService.get(id, 1)
    if (!todo) reply.notFound()
    reply.send(todo)
  }

  const getAll: TodosControllerLike['GET_ALL'] = async (request, reply) => {
    console.log(request.user)
    const todos = await todosService.getAll(1)
    reply.send(todos)
  }

  const add: TodosControllerLike['ADD'] = async (request, reply) => {
    const newTodo = request.body
    await todosService.add(newTodo)
    reply.code(201)
  }

  const update: TodosControllerLike['UPDATE'] = async (request, reply) => {
    const { id } = request.params
    console.log(request.user)

    const targetTodo = await todosService.get(id, 1)
    if (!targetTodo) reply.notFound()
    const updatedTodo = await todosService.update(id, request.body)
    reply.send(updatedTodo)
  }

  const remove: TodosControllerLike['REMOVE'] = async (request, reply) => {
    const { id } = request.params
    const targetTodo = await todosService.get(id, 1)
    if (!targetTodo) reply.notFound()
    await todosService.remove(id)
    reply.code(204).send()
  }
  return { get, getAll, add, update, remove }
}

export { TodosController }
