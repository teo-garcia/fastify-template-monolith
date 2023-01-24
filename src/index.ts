import fastify, { FastifyRequest } from 'fastify'
import dotenv from 'dotenv'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import sensible from '@fastify/sensible'
import fastifyAuth from '@fastify/auth'
import fastifyJwt from '@fastify/jwt'

dotenv.config()

import { SwaggerConfig } from '@config/swagger.config'
import { FastifyConfig } from '@config/fastify.config'
import { JwtConfig } from '@config/jwt.config'

import { TodoRouter } from '@routers/todo.router'
import { HealthRouter } from '@routers/health.router'
import { UserRouter } from '@routers/user.router'

import { database } from '@tools/database'

const app = fastify(FastifyConfig)

/* Plugins */
app.register(sensible)
app.register(swagger)
app.register(swaggerUI, SwaggerConfig)
app.register(fastifyAuth)
app.register(fastifyJwt, JwtConfig)

/* Decorators */
app.decorate('verifyJwtToken', async (request: FastifyRequest) => {
  try {
    await request.jwtVerify()
  } catch (error) {
    console.error(error)
  }
})

/* Routers */
app.register(HealthRouter)
app.register(TodoRouter)
app.register(UserRouter)

const bootstrap = async (): Promise<void> => {
  try {
    const port = parseInt(process.env.SERVER_PORT as string)
    await database.sync()
    await app.listen({ port })
    app.log.info(port)
    console.info(`[fastify] running at port: ${port} 🚀`)
  } catch (error) {
    app.log.error(error)
    console.error(error)
    process.exit(1)
  }
}

bootstrap()
