import {
  FastifyRequest,
  FastifyReply,
  HTTPMethods,
  RouteHandlerMethod,
} from "fastify";
import { IRouters } from "@/module/domain/routers/routers";
import { ExampleController } from "@/module/infrastructure/controllers/ex.controller";

type route = {
  method: HTTPMethods;
  url: string;
  handler: RouteHandlerMethod;
};

export class ExampleRouterFastify implements IRouters<Array<route>> {
  private routes!: Array<route>;

  constructor() {
    this.handlers();
  }

  private handlers() {
    this.routes = [
      {
        method: "POST",
        url: "/publish",
        handler: async (req: FastifyRequest, rep: FastifyReply) => {
          const body: any = req.body;
          const messageId = await ExampleController.execute(body.message);

          rep.status(200).send(body);
        },
      },
    ];
  }

  public api() {
    return this.routes;
  }
}
