import Fastify from "fastify";
import dotenv from "dotenv";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

// TODO: Fix Typescript Paths
import database from "./tools/database";
import routes from "./plugins/routes";
import swaggerConfig from "./config/swagger.config";

const logger = false;

const server = Fastify({ logger });

/* Plugins */
server.register(swagger);
server.register(swaggerUI, swaggerConfig);
server.register(routes);

const bootstrap = async () => {
  try {
    const port = parseInt(process.env.SERVER_PORT!);
    await database.sync();
    await server.listen({ port });
    server.log.info(port);
    console.info(`[fastify] running at port: ${port} 🚀`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

dotenv.config();
bootstrap();
