import { FastifyInstance } from 'fastify'
import { Todo } from '@tools/types'

class TodosService {
  private readonly app: FastifyInstance

  constructor(app: FastifyInstance) {
    this.app = app
  }

  async get(id: number, userId: number): Promise<Todo | undefined> {
    const client = await this.app.pg.connect()
    const todo: Todo = (
      await client.query(
        `SELECT * FROM todos WHERE id = $1 AND user_id = $2;`,
        [id, userId]
      )
    ).rows[0]

    return todo
  }

  async getAll(userId: number): Promise<Todo[]> {
    console.log(userId)
    const client = await this.app.pg.connect()
    const todos: Todo[] = (
      await client.query(`SELECT * FROM todos WHERE user_id = $1;`, [userId])
    ).rows
    return todos
  }

  async add(todo: Todo): Promise<void> {
    const client = await this.app.pg.connect()
    await client.query(
      `INSERT INTO todos (description, status) VALUES($1, $2)`,
      [todo.description, todo.status]
    )
  }

  async update(id: number, todo: Todo): Promise<Todo> {
    const client = await this.app.pg.connect()
    const updatedTodo: Todo = (
      await client.query(
        `UPDATE todos SET description = $1, status = $2 WHERE id = $3 RETURNING *;`,
        [todo.description, todo.status, id]
      )
    ).rows[0]
    return updatedTodo
  }

  async remove(id: number): Promise<void> {
    const client = await this.app.pg.connect()
    await client.query(`DELETE FROM todos WHERE id = $1;`, [id])
  }
}

export { TodosService }
