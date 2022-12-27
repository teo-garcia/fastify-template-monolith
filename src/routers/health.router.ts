import type { FastifyPluginCallback, FastifyReply } from 'fastify'

const HealthRouter: FastifyPluginCallback = async (fastify) => {
  fastify.route({
    method: 'GET',
    url: '/health',
    handler: (_, reply: FastifyReply) => {
      reply.send({ status: 'ok' })
    },
  })
}

export { HealthRouter }
