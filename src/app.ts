import 'dotenv/config'
import fastify, { FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import sensible from '@fastify/sensible'
import postgres from '@fastify/postgres'
import fastifyAuth from '@fastify/auth'
import fastifyJwt from '@fastify/jwt'

import { SwaggerConfig } from '@config/swagger.config'
import { FastifyConfig } from '@config/fastify.config'
import { PostgresConfig } from '@config/postgres.config'
import { JwtConfig } from '@config/jwt.config'

import { TodosRouter } from '@routers/todos.router'
import { HealthRouter } from '@routers/health.router'
import { UsersRouter } from '@routers/users.router'
import { verifyJWTandLevel, verifyUserAndPassword } from '@tools/jwt'

declare module 'fastify' {
  interface FastifyInstance {
    verifyJWTandLevel: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>
    verifyUserAndPassword: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>
  }
}

const bootstrap = (): FastifyInstance => {
  const app = fastify(FastifyConfig)

  /* Plugins */
  app.register(sensible)
  app.register(swagger)
  app.register(swaggerUI, SwaggerConfig)
  app.register(postgres, PostgresConfig)
  app.register(fastifyJwt, JwtConfig)
  app.register(fastifyAuth)

  app.decorate('verifyJWTandLevel', verifyJWTandLevel)
  app.decorate('verifyUserAndPassword', verifyUserAndPassword)

  /* Routers */
  app.register(HealthRouter)
  app.register(UsersRouter)

  app.after(() => {
    app.register(TodosRouter)
  })

  return app
}

bootstrap()

export { bootstrap }
