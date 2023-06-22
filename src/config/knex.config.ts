const KnexConfig = {
  development: {
    client: 'postgresql',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: './src/db/migrations',
      tableName: 'migrations',
      sortDirsSeparately: true,
    },
    seeds: {
      directory: './src/db/seeds',
      sortDirsSeparately: true,
    },
  },
  production: {
    client: 'postgresql',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: './src/db/migrations',
      tableName: 'migrations',
      sortDirsSeparately: true,
    },
    seeds: {
      directory: './src/db/seeds',
      sortDirsSeparately: true,
    },
  },
}[process.env.NODE_ENV || 'development']

export { KnexConfig }
