import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

class HealthRouter {
  private app: FastifyInstance

  constructor(app: FastifyInstance) {
    this.app = app
  }

  public registerRoutes(): void {
    this.app.route({
      method: 'GET',
      url: '/health',
      handler: this.get,
    })
  }

  private get = (_: FastifyRequest, reply: FastifyReply): void => {
    reply.send({ status: 'ok' })
  }
}

export { HealthRouter }
