import type { TodoControllerLike } from '@tools/types'
import { TodoService } from '@services/todo.service'

const get: TodoControllerLike['GET'] = async (request, reply) => {
  const { id } = request.params
  const todo = await TodoService.get(id)
  if (!todo) reply.notFound()
  reply.send(todo)
}

const getAll: TodoControllerLike['GET_ALL'] = async (request, reply) => {
  const todos = await TodoService.getAll()
  reply.send(todos)
}

const add: TodoControllerLike['ADD'] = async (request, reply) => {
  const newTodo = request.body
  const addedTodo = await TodoService.add(newTodo)
  reply.code(201).send(addedTodo)
}

const update: TodoControllerLike['UPDATE'] = async (request, reply) => {
  const { id } = request.params
  const targetTodo = await TodoService.get(id)
  if (!targetTodo) reply.notFound()
  const updatedTodo = await TodoService.update(id, request.body)
  reply.send(updatedTodo)
}

const remove: TodoControllerLike['REMOVE'] = async (request, reply) => {
  const { id } = request.params
  const targetTodo = await TodoService.get(id)
  if (!targetTodo) reply.notFound()

  await TodoService.remove(id)
  reply.code(204).send()
}

const TodoController = { get, getAll, add, update, remove }

export { TodoController }
