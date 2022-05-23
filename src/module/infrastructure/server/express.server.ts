import express, { Application, Request, Response, NextFunction } from "express";
import { IServer } from "../../domain/server/server";
import { ExampleRouterExpress } from "../routers/ex.router.express";

export class ExpressServer implements IServer {
  private app: Application;
  private server!: any;

  constructor(private port: number | string) {
    this.app = express();

    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());

    this.app.use((_req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
      );
      res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

      next();
    });
  }

  private routes(): void {
    this.app.use("/", new ExampleRouterExpress().api());
  }

  public async start() {
    this.server = this.app.listen(this.port, () => {
      console.info(`Server running on port ${this.port}`);
    });
  }

  public async stop(): Promise<void> {
    this.server.close();
  }
}
