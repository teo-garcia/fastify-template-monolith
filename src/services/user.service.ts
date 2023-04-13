import { hashPassword } from '@tools/bcrypt'
import { User } from '@tools/types'
import type { FastifyInstance } from 'fastify'

const UserService = (app: FastifyInstance) => {
  const get = async (id: number): Promise<User | undefined> => {
    const client = await app.pg.connect()
    const user: User = (
      await client.query(`SELECT * FROM users WHERE id=$1;`, [id])
    ).rows[0]

    return user
  }
  const getByEmail = async (email: string): Promise<User | undefined> => {
    const client = await app.pg.connect()
    const user: User = (
      await client.query(`SELECT * FROM users WHERE email=$1;`, [email])
    ).rows[0]
    return user
  }
  const getAll = async (): Promise<Array<User>> => {
    const client = await app.pg.connect()
    const users: Array<User> = (
      await client.query(`SELECT * FROM users WHERE;`)
    ).rows
    return users
  }
  const add = async (user: User) => {
    const client = await app.pg.connect()
    const hashedPassword = await hashPassword(user.password)
    await client.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      [user.name, user.email, hashedPassword]
    )
  }
  const update = async (id: number, user: Partial<User>): Promise<User> => {
    const client = await app.pg.connect()
    const updatedUser: User = (
      await client.query(
        `UPDATE users SET name = $2, email = $3, password = $4 WHERE id = $1 RETURNING *`,
        [id, user.name, user.email, user.password]
      )
    ).rows[0]
    return updatedUser
  }
  const remove = async (id: number): Promise<void> => {
    const client = await app.pg.connect()
    await client.query(`DELETE FROM users WHERE id = $1`, [id])
  }
  return { get, getByEmail, getAll, add, update, remove }
}

export { UserService }
