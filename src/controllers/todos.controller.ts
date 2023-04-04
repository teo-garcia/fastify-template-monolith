import type { FastifyInstance } from 'fastify'
import type { TodosControllerLike } from '@tools/types'
import { TodosService } from '@services/todos.service'

const TodosController = (fastify: FastifyInstance) => {
  const todosService = TodosService(fastify)

  const get: TodosControllerLike['GET'] = async (request, reply) => {
    const { id } = request.params
    const todo = await todosService.get(id)
    if (!todo) reply.notFound()
    reply.send(todo)
  }

  const getAll: TodosControllerLike['GET_ALL'] = async (request, reply) => {
    const todos = await todosService.getAll()
    reply.send(todos)
  }

  const add: TodosControllerLike['ADD'] = async (request, reply) => {
    const newTodo = request.body
    await todosService.add(newTodo)
    reply.code(201)
  }

  const update: TodosControllerLike['UPDATE'] = async (request, reply) => {
    const { id } = request.params
    const targetTodo = await todosService.get(id)
    if (!targetTodo) reply.notFound()
    const updatedTodo = await todosService.update(id, request.body)
    reply.send(updatedTodo)
  }

  const remove: TodosControllerLike['REMOVE'] = async (request, reply) => {
    const { id } = request.params
    const targetTodo = await todosService.get(id)
    if (!targetTodo) reply.notFound()
    await todosService.remove(id)
    reply.code(204).send()
  }
  return { get, getAll, add, update, remove }
}

export { TodosController }
