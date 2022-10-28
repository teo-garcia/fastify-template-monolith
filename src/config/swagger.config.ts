import type { SwaggerOptions } from "@fastify/swagger";

export default {
  routePrefix: "/swagger",
  swagger: {
    info: {
      title: "Todo API",
      description: "Todo CRUD",
      version: "0.1.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: "localhost",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
  // uiConfig: {
  //   docExpansion: "full",
  //   deepLinking: false,
  // },
  // uiHooks: {
  //   onRequest: function (request, reply, done) {
  //     done();
  //   },
  //   preHandler: function (request, reply, done) {
  //     done();
  //   },
  // },
  // staticCSP: true,
  // transformStaticCSP: (header) => header,
  // exposeRoute: true,
} as SwaggerOptions;
