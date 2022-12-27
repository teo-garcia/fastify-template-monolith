import { Sequelize } from 'sequelize'

const database = new Sequelize({
  dialect: 'sqlite',
  storage: 'dev.db',
  logging: false, // TODO: Bind logging with Fastify Logger
})

export { database }
