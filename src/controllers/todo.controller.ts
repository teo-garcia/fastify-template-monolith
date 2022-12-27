import type { TodoControllerLike } from '@tools/types'
import { TodoService } from '@services/todo.service'
import { isHttpError } from '@tools/isHttpError'

const get: TodoControllerLike['GET'] = async (request, reply) => {
  try {
    const { id } = request.params
    const todo = await TodoService.get(id)
    reply.send(todo)
  } catch (error) {
    if (isHttpError(error)) {
      reply.status(error.statusCode).send({ message: error.message })
    }
  }
}

const getAll: TodoControllerLike['GET_ALL'] = async (request, reply) => {
  try {
    const todos = await TodoService.getAll()
    reply.send(todos)
  } catch (error) {
    if (isHttpError(error)) {
      reply.status(error.statusCode).send({ message: error.message })
    }
  }
}

const add: TodoControllerLike['ADD'] = async (request, reply) => {
  try {
    const newTodo = request.body
    const addedTodo = await TodoService.add(newTodo)
    reply.code(201).send(addedTodo)
  } catch (error) {
    if (isHttpError(error)) {
      reply.status(error.statusCode).send({ message: error.message })
    }
  }
}

const update: TodoControllerLike['UPDATE'] = async (request, reply) => {
  try {
    const { id } = request.params
    const newTodo = request.body
    const updatedTodo = await TodoService.update(id, newTodo)
    reply.send(updatedTodo)
  } catch (error) {
    if (isHttpError(error)) {
      reply.status(error.statusCode).send({ message: error.message })
    }
  }
}

const remove: TodoControllerLike['REMOVE'] = async (request, reply) => {
  try {
    const { id } = request.params
    await TodoService.remove(id)
    reply.code(204).send()
  } catch (error) {
    if (isHttpError(error)) {
      reply.status(error.statusCode).send({ message: error.message })
    }
  }
}

const TodoController = { get, getAll, add, update, remove }

export { TodoController }
