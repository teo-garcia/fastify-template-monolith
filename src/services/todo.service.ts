import fastify from 'fastify'
import type { Todo as TodoType } from '@tools/types'
import { TodoModel } from '@models/todo.model'

// FIXME: This approach does not work
const app = fastify()

const get = async (id: number) => {
  const todo = await TodoModel.findByPk(id)

  if (!todo) throw app.httpErrors.notFound('Todo not found')

  return todo
}

const getAll = async () => {
  const todos = await TodoModel.findAll()
  return todos
}

const add = async (todo: TodoType) => {
  const createdTodo = await TodoModel.create(todo)
  return createdTodo
}

const update = async (id: number, todo: Partial<TodoType>) => {
  const targetTodo = await TodoModel.findByPk(id)
  if (!targetTodo) throw app.httpErrors.notFound('Todo not found')
  const updatedTodo = await TodoModel.update(todo, { where: { id } })
  return updatedTodo
}

const remove = async (id: number) => {
  const targetTodo = await TodoModel.findByPk(id)
  if (!targetTodo) throw app.httpErrors.notFound('Note not found')
  await TodoModel.destroy({ where: { id } })
}

const TodoService = { get, getAll, add, update, remove }

export { TodoService }
