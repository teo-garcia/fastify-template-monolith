import type { Todo } from '@tools/types'
import type { FastifyInstance } from 'fastify'

const TodosService = (fastify: FastifyInstance) => {
  const get = async (id: number): Promise<Todo | undefined> => {
    const client = await fastify.pg.connect()
    const todo: Todo = (
      await client.query(`SELECT * FROM todos WHERE id=$1;`, [id])
    ).rows[0]

    return todo
  }

  const getAll = async (): Promise<Array<Todo>> => {
    const client = await fastify.pg.connect()
    const todos: Array<Todo> = (await client.query(`SELECT * FROM todos;`)).rows
    return todos
  }

  const add = async (todo: Todo): Promise<void> => {
    const client = await fastify.pg.connect()
    await client.query(
      `INSERT INTO todos (title, description, status) VALUES($1, $2, $3)`,
      [todo.title, todo.description, todo.status]
    )
  }

  const update = async (id: number, todo: Todo): Promise<Todo> => {
    const client = await fastify.pg.connect()
    const updatedTodo: Todo = (
      await client.query(
        `UPDATE todos SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *;`,
        [todo.title, todo.description, todo.status, id]
      )
    ).rows[0]
    return updatedTodo
  }

  const remove = async (id: number): Promise<void> => {
    const client = await fastify.pg.connect()
    await client.query(`DELETE FROM todos WHERE id = $1;`, [id])
  }

  return { get, getAll, add, update, remove }
}

export { TodosService }
