export default (host: string | number) => ({
  routePrefix: "/documentation",
  exposeRoute: true,
  swagger: {
    info: {
      title: "Swagger",
      description: "Swagger API",
      version: "1.0.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: `http://localhost:${host}`,
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});
