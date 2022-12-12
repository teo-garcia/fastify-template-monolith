import { DataTypes } from 'sequelize'
import database from '@tools/database'

const Todo = database.define('Todo', {
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

export default Todo
