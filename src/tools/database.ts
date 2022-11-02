import { Sequelize } from "sequelize";

export default new Sequelize({
  dialect: "sqlite",
  storage: "src/database/dev.db",
  logging: false, // TODO: Bind logging with Fastify Logger
});
