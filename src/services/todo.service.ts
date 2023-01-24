import type { Todo } from '@tools/types'
import { TodoModel } from '@models/todo.model'

// TODO: Annotate these functions correctly
const TodoService = () => {
  const get = async (id: number): Promise<Todo | undefined> => {
    return await TodoModel.findByPk(id).then((todo) => todo?.get())
  }

  const getAll = async (): Promise<Array<Todo>> => {
    return await TodoModel.findAll().then((todos) =>
      todos.map((todo) => todo.get())
    )
  }

  const add = async (todo: Todo): Promise<Todo> => {
    return await TodoModel.create(todo).then((todo) => todo.get())
  }

  const update = async (id: number, todo: Partial<Todo>): Promise<any> => {
    return await TodoModel.update(todo, { where: { id } })
  }

  const remove = async (id: number): Promise<number> => {
    return await TodoModel.destroy({ where: { id } })
  }
  return { get, getAll, add, update, remove }
}

export { TodoService }
