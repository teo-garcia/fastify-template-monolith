import fp from 'fastify-plugin'
import knex from 'knex'
import type { FastifyPluginCallback } from 'fastify'
import type { Knex } from 'knex'

let dbInstance: Knex | null = null

const setupDB: FastifyPluginCallback = (fastify, options, next) => {
  if (!dbInstance) {
    const knexConfig: Knex.Config = {
      debug: true,
      log: {
        debug(message: string) {
          fastify.log.info(message)
        },
        warn(message: string) {
          fastify.log.warn(message)
        },
        error(message: string) {
          fastify.log.error(message)
        },
      },
      ...options,
    }
    dbInstance = knex(knexConfig)
  }
  fastify.decorate('knex', dbInstance)
  next()
}

const knexPlugin = fp<Knex.Config>(setupDB, {
  name: 'knex-plugin',
})

export { knexPlugin, dbInstance }
