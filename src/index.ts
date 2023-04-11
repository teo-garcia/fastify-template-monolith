import 'dotenv/config'
import fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import sensible from '@fastify/sensible'
import postgres from '@fastify/postgres'
import fastifyAuth from '@fastify/auth'

import fastifyBasicAuth from '@fastify/basic-auth'

import { SwaggerConfig } from '@config/swagger.config'
import { FastifyConfig } from '@config/fastify.config'
import { PostgresConfig } from '@config/postgres.config'

import { TodosRouter } from '@routers/todos.router'
import { HealthRouter } from '@routers/health.router'
import { UserRouter } from '@routers/user.router'

const app = fastify(FastifyConfig)

const BasicAuthConfig = {
  validate: async (username: string, password: string) => {
    const isValid = username === 'jmgr2996' && password === '123456'
    if (!isValid) return new Error('Invalid username or password')
  },
  authenticate: true,
}

/* Plugins */
app.register(sensible)
app.register(swagger)
app.register(swaggerUI, SwaggerConfig)
app.register(postgres, PostgresConfig)
app.register(fastifyAuth)
app.register(fastifyBasicAuth, BasicAuthConfig)

/* Public Routers */
app.register(HealthRouter)
app.register(TodosRouter)
app.register(UserRouter)

/* Private Routers */
app.after(() => {
  app.route({
    method: 'GET',
    url: '/protected',
    onRequest: app.auth([app.basicAuth]),
    handler: async (req, reply) => {
      return {
        hello: 'world',
      }
    },
  })
})

const bootstrap = async (): Promise<void> => {
  try {
    const port = parseInt(process.env.SERVER_PORT as string)
    await app.listen({ port })
    app.log.info(port)
    console.info(`[fastify] running at http://localhost:${port}/ 🚀`)
  } catch (error) {
    app.log.error(error)
    console.error(error)
    process.exit(1)
  }
}

bootstrap()
