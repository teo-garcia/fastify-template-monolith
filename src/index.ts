import Fastify from "fastify";
import dotenv from "dotenv";
import routes from "./plugins/routes";
import swaggerOptions from "./config/swagger.config";
import swagger from "@fastify/swagger";

const logger = true;

const server = Fastify({ logger });

/* Plugins */
// Ecosystem
server.register(swagger, swaggerOptions);

// Custom
server.register(routes);

const bootstrap = async () => {
  try {
    const port = parseInt(process.env.SERVER_PORT!);
    await server.listen({ port });
    await server.ready();
    server.swagger();

    server.log.info(port);
    console.info(`[Fastify] running at port: ${port} 🚀`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

dotenv.config();
bootstrap();
