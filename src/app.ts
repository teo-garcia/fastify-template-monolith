import 'dotenv/config'
import fastify from 'fastify'
import type { FastifyInstance } from 'fastify'
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

class App {
  public readonly app: FastifyInstance

  constructor() {
    this.app = fastify(FastifyConfig)
    this.registerPlugins()
    this.registerDecorators()
    this.registerRouters()
  }

  private registerPlugins(): void {
    this.app.register(sensible)
    this.app.register(swagger, SwaggerConfig)
    this.app.register(swaggerUI, SwaggerConfig)
    this.app.register(postgres, PostgresConfig)
    this.app.register(fastifyJwt, JwtConfig)
    this.app.register(fastifyAuth)
  }

  private registerDecorators(): void {
    this.app.decorate('verifyJWTandLevel', verifyJWTandLevel)
    this.app.decorate('verifyUserAndPassword', verifyUserAndPassword)
  }

  private registerRouters(): void {
    const healthRouter = new HealthRouter(this.app)
    const todoRouter = new TodosRouter(this.app)
    const userRouter = new UsersRouter(this.app)

    healthRouter.registerRoutes()
    userRouter.registerRoutes()
    this.app.after(() => {
      todoRouter.registerRoutes()
    })
  }
}

export { App }
