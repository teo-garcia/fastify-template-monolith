import fastify from 'fastify'
import { App } from 'app'
import { FastifyConfig } from '@config/fastify.config'
;(async () => {
  const app = new App(fastify(FastifyConfig))
  await app.bootstrap()
  await app.run()
})()
