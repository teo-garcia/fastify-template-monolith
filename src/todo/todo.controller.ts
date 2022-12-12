import type { FastifyReply, FastifyRequest } from 'fastify'
import type { TodoRequest } from '@tools/types'

import todoService from './todo.service'

async function get(
  request: FastifyRequest<TodoRequest['GET']>,
  reply: FastifyReply
) {
  const { id } = request.params
  const todo = await todoService.get(id)
  reply.send(todo)
}

async function getAll(request: FastifyRequest, reply: FastifyReply) {
  const todos = await todoService.getAll()
  reply.send(todos)
}

async function add(
  request: FastifyRequest<TodoRequest['POST']>,
  reply: FastifyReply
) {
  const newTodo = request.body
  const addedTodo = await todoService.add(newTodo)
  reply.code(201).send(addedTodo)
}

async function update(
  request: FastifyRequest<TodoRequest['PUT']>,
  reply: FastifyReply
) {
  const { id } = request.params
  const newTodo = request.body
  const updatedTodo = await todoService.update(id, newTodo)
  reply.send(updatedTodo)
}

async function remove(
  request: FastifyRequest<TodoRequest['DELETE']>,
  reply: FastifyReply
) {
  const { id } = request.params
  await todoService.remove(id)
  reply.code(204).send()
}

export default { get, getAll, add, update, remove }
