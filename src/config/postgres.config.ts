import type { PostgresPluginOptions } from '@fastify/postgres'

const PostgresConfig = {
  connectionString: process.env.PG_CONNECTION_STRING,
} satisfies PostgresPluginOptions

export { PostgresConfig }
