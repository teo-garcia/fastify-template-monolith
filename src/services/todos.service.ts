import type { FastifyInstance } from 'fastify'
import type { Todo, User } from '@tools/types'

class TodosService {
  private app: FastifyInstance

  constructor(app: FastifyInstance) {
    this.app = app
  }

  public get = async (
    id: number,
    userId: number
  ): Promise<Todo | undefined> => {
    const todo: Todo | undefined = await this.app
      .knex('todos')
      .where({ id, user_id: userId })
      .first()
    return todo
  }

  public getAll = async (userId: number): Promise<Todo[]> => {
    const todos: Todo[] = await this.app
      .knex('todos')
      .where('user_id', userId)
      .select()
    return todos
  }

  public add = async (todo: Todo, userId: User['id']): Promise<void> => {
    await this.app.knex('todos').insert({
      description: todo.description,
      status: todo.status,
      user_id: userId,
    })
  }

  public update = async (id: number, todo: Todo): Promise<Todo> => {
    const updatedTodo: Todo = await this.app
      .knex('todos')
      .where('id', id)
      .update({
        description: todo.description,
        status: todo.status,
      })
      .returning('*')
      .then((rows) => rows[0])
    return updatedTodo
  }

  public remove = async (id: number): Promise<void> => {
    await this.app.knex('todos').where('id', id).del()
  }
}

export { TodosService }
