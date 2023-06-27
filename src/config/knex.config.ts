const KnexConfig = {
  client: 'postgresql',
  connection: {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
    user: process.env.POSTGRES_USER ?? '',
    password: process.env.POSTGRES_PASSWORD ?? '',
    database: process.env.POSTGRES_DB ?? '',
  },
  migrations: {
    directory: './src/db/migrations',
    tableName: 'migrations',
    sortDirsSeparately: true,
  },
  seeds: {
    directory: './src/db/seeds',
    sortDirsSeparately: true,
  },
}

export { KnexConfig }
