import Fastify, { FastifyInstance } from "fastify";
import { IServer } from "@/module/domain/server/server";
import { ExampleRouterFastify } from "@/module/infrastructure/routers/ex.router.fastify";
import swagger from "@/module/infrastructure/open-api/swagger.api";

export class FastifyServer implements IServer {
  private app: FastifyInstance;
  private server!: any;

  constructor(private port: number | string) {
    this.app = Fastify({ logger: true });
    this.app.register(require("@fastify/swagger"), swagger(this.port));

    this.routes();
  }

  async start(): Promise<void> {
    this.server = await this.app.listen(this.port);

    this.app.log.info(`Server listening on ${this.server}`);
  }

  private routes(): void {
    new ExampleRouterFastify().api().map((route) => {
      this.app.route(route);
    });
  }

  async stop(): Promise<void> {
    this.app.close();
  }
}
