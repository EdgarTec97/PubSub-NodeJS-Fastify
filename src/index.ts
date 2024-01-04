import { ExpressServer } from "@/module/infrastructure/server/express.server";
import { FastifyServer } from "@/module/infrastructure/server/fastify.server";
import config from "@/module/infrastructure/config/config";

//new ExpressServer(config.SERVER.PORT).start();
new FastifyServer(config.SERVER.PORT).start();
