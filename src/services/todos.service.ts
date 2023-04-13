import type { Todo } from '@tools/types'
import type { FastifyInstance } from 'fastify'

const TodosService = (app: FastifyInstance) => {
  const get = async (id: number, userId: number): Promise<Todo | undefined> => {
    const client = await app.pg.connect()
    const todo: Todo = (
      await client.query(
        `SELECT * FROM todos WHERE id = $1 AND user_id = $2;`,
        [id, userId]
      )
    ).rows[0]

    return todo
  }

  const getAll = async (userId: number): Promise<Array<Todo>> => {
    const client = await app.pg.connect()
    const todos: Array<Todo> = (
      await client.query(`SELECT * FROM todos WHERE user_id = $1;`, [userId])
    ).rows
    return todos
  }

  const add = async (todo: Todo): Promise<void> => {
    const client = await app.pg.connect()
    await client.query(
      `INSERT INTO todos (description, status) VALUES($1, $2)`,
      [todo.description, todo.status]
    )
  }

  const update = async (id: number, todo: Todo): Promise<Todo> => {
    const client = await app.pg.connect()
    const updatedTodo: Todo = (
      await client.query(
        `UPDATE todos SET description = $1, status = $2 WHERE id = $3 RETURNING *;`,
        [todo.description, todo.status, id]
      )
    ).rows[0]
    return updatedTodo
  }

  const remove = async (id: number): Promise<void> => {
    const client = await app.pg.connect()
    await client.query(`DELETE FROM todos WHERE id = $1;`, [id])
  }

  return { get, getAll, add, update, remove }
}

export { TodosService }
