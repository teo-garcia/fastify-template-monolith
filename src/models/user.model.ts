import { DataTypes, Model } from 'sequelize'
import { database } from '@tools/database'
import { hashPassword } from '@tools/bcrypt'
import { User } from '@tools/types'

const UserModel = database.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

UserModel.beforeCreate(async (userInstance) => {
  const user: User = userInstance.get()
  const hashedPassword = await hashPassword(user.password)
  userInstance.set('password', hashedPassword)
})

export { UserModel }
