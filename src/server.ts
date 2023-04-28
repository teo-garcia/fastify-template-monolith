import { bootstrap } from './app'

const server = bootstrap()

const port = parseInt(process.env.SERVER_PORT as string)

server.listen({ port }, (error, address) => {
  if (error) {
    server.log.error(error)
    console.error(123, error)
    process.exit(1)
  }

  server.log.info(port)
  console.info(`[fastify] running at ${address} 🚀`)
})
