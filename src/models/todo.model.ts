import { DataTypes } from 'sequelize'
import { database } from '@tools/database'

const TodoModel = database.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
})

export { TodoModel }
