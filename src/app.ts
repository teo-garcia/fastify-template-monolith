import type { FastifyInstance } from 'fastify'
import type { Knex } from 'knex'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import sensible from '@fastify/sensible'
import auth from '@fastify/auth'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'
import compress from '@fastify/compress'
import { SwaggerConfig } from '@config/swagger.config'
import { JwtConfig } from '@config/jwt.config'
import { CorsSettings } from '@config/cors.config'

import { TodosRouter } from '@routers/todos.router'
import { HealthRouter } from '@routers/health.router'
import { UsersRouter } from '@routers/users.router'
import { verifyAdmin, verifyJWT, verifyUserAndPassword } from '@tools/jwt'
import { knexPlugin } from '@tools/db'
import { KnexConfig } from '@config/knex.config'

declare module 'fastify' {
  interface FastifyInstance {
    verifyJWT: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
    verifyAdmin: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
    verifyUserAndPassword: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>
    knex: Knex
  }
}

class App {
  constructor(private readonly app: FastifyInstance) {}

  public async bootstrap() {
    await this.registerDecorators()
    this.app.log.info('Registered Decorators')
    await this.registerPlugins()
    this.app.log.info('Registered Plugins')
    await this.registerRouters()
    this.app.log.info('Registered Routes')
  }

  public async run() {
    const host = process.env.SERVER_HOST as string
    const port = parseInt(process.env.SERVER_PORT as string)
    this.app.listen({ host, port }, (error) => {
      if (error) {
        this.app.log.error(error)
        console.error(error)
        process.exit(1)
      }
    })
  }

  private async registerPlugins(): Promise<void> {
    await this.app.register(cors, CorsSettings)
    await this.app.register(compress)
    await this.app.register(sensible)
    await this.app.register(swagger, SwaggerConfig)
    await this.app.register(swaggerUI, SwaggerConfig)
    await this.app.register(knexPlugin, KnexConfig)
    await this.app.register(jwt, JwtConfig)
    await this.app.register(auth)
  }

  private async registerDecorators(): Promise<void> {
    await this.app.decorate('verifyJWT', verifyJWT)
    await this.app.decorate('verifyAdmin', verifyAdmin)
    await this.app.decorate('verifyUserAndPassword', verifyUserAndPassword)
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
