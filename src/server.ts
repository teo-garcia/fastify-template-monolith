import { App } from './app'

const { app } = new App()
const port = parseInt(process.env.SERVER_PORT as string)

app.listen({ port }, (error, address) => {
  if (error) {
    app.log.error(error)
    console.error(error)
    process.exit(1)
  }

  app.log.info(port)
  console.info(`[fastify] running at ${address} 🚀`)
})
