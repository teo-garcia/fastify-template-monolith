import type { FastifyReply, FastifyRequest } from 'fastify'
import type { Todo } from '../tools/types'
import todoService from './todo.service'

export type GetRequest = {
  Params: {
    id: number
  }
}

export type UpdateRequest = {
  Body: Todo
  Params: {
    id: number
  }
}

export type AddRequest = {
  Body: Todo
}

export type RemoveRequest = {
  Params: {
    id: number
  }
}

async function get(request: FastifyRequest<GetRequest>, reply: FastifyReply) {
  const { id } = request.params
  const todo = await todoService.get(id)
  reply.send(todo)
}

async function getAll(request: FastifyRequest, reply: FastifyReply) {
  const todos = await todoService.getAll()
  reply.send(todos)
}

async function add(request: FastifyRequest<AddRequest>, reply: FastifyReply) {
  const newTodo = request.body
  const addedTodo = await todoService.add(newTodo)
  reply.code(201).send(addedTodo)
}

async function update(
  request: FastifyRequest<UpdateRequest>,
  reply: FastifyReply
) {
  const { id } = request.params
  const newTodo = request.body
  const updatedTodo = await todoService.update(id, newTodo)
  reply.send(updatedTodo)
}

async function remove(
  request: FastifyRequest<RemoveRequest>,
  reply: FastifyReply
) {
  const { id } = request.params
  await todoService.remove(id)
  reply.code(204).send()
}

export default { get, getAll, add, update, remove }
