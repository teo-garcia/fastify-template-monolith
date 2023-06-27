import type { FastifyInstance } from 'fastify'
import { hashPassword } from '@tools/bcrypt'
import { User } from '@tools/types'

class UsersService {
  private app: FastifyInstance

  constructor(app: FastifyInstance) {
    this.app = app
  }

  public get = async (id: number): Promise<User | undefined> => {
    const user: User | undefined = await this.app
      .knex('users')
      .where('id', id)
      .first()
    return user
  }

  public getByEmail = async (email: string): Promise<User | undefined> => {
    const user: User | undefined = await this.app
      .knex('users')
      .where('email', email)
      .first()
    return user
  }

  public getAll = async (): Promise<Array<User>> => {
    const users: Array<User> = await this.app.knex('users').select()
    return users
  }

  public add = async (user: Omit<User, 'id'>) => {
    const hashedPassword = await hashPassword(user.password)
    await this.app.knex('users').insert({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    })
  }

  public update = async (id: number, user: Partial<User>): Promise<void> => {
    const updatedFields: Partial<User> = {
      name: user.name,
    }

    if (user.password) {
      updatedFields.password = await hashPassword(user.password)
    }

    await this.app.knex('users').where('id', id).update(updatedFields)
  }

  public remove = async (id: Pick<User, 'id'>): Promise<void> => {
    await this.app.knex('users').where('id', id).del()
  }
}

export { UsersService }
