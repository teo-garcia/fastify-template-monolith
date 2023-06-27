import type { FastifyRegisterOptions } from 'fastify'
import type { SwaggerOptions } from '@fastify/swagger'

const SwaggerConfig = {
  routePrefix: '/swagger',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Fastify Template Monolith',
      description:
        'REST API starter with Fastify, TypeScript, PostgreSQL, and JWT.',
      version: '0.0.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
} as FastifyRegisterOptions<SwaggerOptions>

export { SwaggerConfig }
