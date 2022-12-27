import fastify from 'fastify'
import dotenv from 'dotenv'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import sensible from '@fastify/sensible'

import { database } from '@tools/database'
import { TodoRouter } from '@routes/todo.router'
import { HealthRouter } from '@routes/health.router'
import { SwaggerConfig } from '@config/swagger.config'
import { FastifyConfig } from '@config/fastify.config'

const app = fastify(FastifyConfig)

/* Plugins */
app.register(sensible)
app.register(swagger)
app.register(swaggerUI, SwaggerConfig)

/* Routers */
app.register(HealthRouter)
app.register(TodoRouter)

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

dotenv.config()
bootstrap()
