import { SwaggerOptions } from '@fastify/swagger'
import type { FastifyRegisterOptions } from 'fastify'

export default {
  routePrefix: '/swagger',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'TODO API',
      description: 'TODO CRUD',
      version: '0.1.0',
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
