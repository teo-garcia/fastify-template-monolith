import type { FastifyServerOptions } from 'fastify'

// TODO: Only enable for testing in dev
const logger = {
  transport: {
    target: 'pino-pretty',
  },
}

const FastifyConfig = {
  logger,
} satisfies FastifyServerOptions

export { FastifyConfig }
