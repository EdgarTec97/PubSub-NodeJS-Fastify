import { Router, Request, Response } from "express";
import { IRouters } from "../../domain/routers/routers";
import { ExampleController } from "../controllers/ex.controller";

export class ExampleRouterExpress implements IRouters<Router> {
  private router: Router;

  constructor() {
    this.router = Router();

    this.routes();
  }

  private routes() {
    this.router.post("/publish", async (req: Request, res: Response) => {
      const message = req.body.message;
      const messageId = await ExampleController.execute(message);

      res.status(200).send({
        data: {
          id: messageId,
          type: "tracking_status_carrier_service",
          occurredAt: new Date().toISOString(),
          attributes: [
            {
              success: true,
              carrier: "ENVIA",
              trackingIds: ["014994732425"],
              message: "OK",
              service: {
                type: "MERCANCIA TERRESTRE",
                description: "TRACKING",
              },
              status_detail: {
                code: "",
                description: "PRODUCIDA EN BOGOTA",
              },
              dates_or_times: {
                estimated_delivery_date: "",
                pickup_date: "",
                delivered_date: "",
              },
              created_at: "05/04/2022 11:04",
              destination_address: {
                city: "BOGOTA-D.C.",
                state_or_province_code: "BOGOTA",
                country_code: "CO",
              },
              shipper_address: {
                city: "BOGOTA",
                state_or_province_code: "BOGOTA",
                country_code: "CO",
              },
              signed_by: "EMPAQUETADURAS CAR LTDA",
              event: [],
              extra: {
                invalid: true,
                oficina_produce: "P -  PRINCIPAL BOGOTA (1-1)",
              },
            },
          ],
        },
        meta: {},
      });
    });
  }

  public api() {
    return this.router;
  }
}
