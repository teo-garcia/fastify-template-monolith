import { UserModel } from '@models/user.model'
import { User } from '@tools/types'

const UserService = () => {
  const get = async (id: number): Promise<User | undefined> => {
    return await UserModel.findByPk(id).then((user) => user?.get())
  }

  const getByEmail = async (email: string): Promise<User | undefined> => {
    return await UserModel.findOne({ where: { email } }).then((user) =>
      user?.get()
    )
  }

  const getAll = async (): Promise<Array<User>> => {
    return await UserModel.findAll().then((users) =>
      users?.map((user) => user.get())
    )
  }

  const add = async (user: User) => {
    return await UserModel.create(user).then((user) => user.get())
  }

  // TODO: Fix this annotation
  const update = async (id: number, user: Partial<User>): Promise<any> => {
    return await UserModel.update(user, { where: { id } })
  }

  const remove = async (id: number): Promise<number> => {
    return await UserModel.destroy({ where: { id } })
  }
  return { get, getByEmail, getAll, add, update, remove }
}

export { UserService }
