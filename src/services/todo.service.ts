import type { Todo as TodoType } from '@tools/types'
import { TodoModel } from '@models/todo.model'

// TODO: Annotate these functions correctly

const get = async (id: number) => {
  return await TodoModel.findByPk(id)
}

const getAll = async () => {
  return await TodoModel.findAll()
}

const add = async (todo: TodoType) => {
  return await TodoModel.create(todo)
}

const update = async (id: number, todo: Partial<TodoType>) => {
  return await TodoModel.update(todo, { where: { id } })
}

const remove = async (id: number) => {
  return await TodoModel.destroy({ where: { id } })
}

const TodoService = { get, getAll, add, update, remove }

export { TodoService }
