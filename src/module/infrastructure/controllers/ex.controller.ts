import { Request, Response } from "express";
import { PubSubClass } from "@/module/infrastructure/event-bus/pub-sub.event.bus";
import { IEventBus } from "@/module/domain/event-bus/event.bus";
import { ProducerService } from "@/module/infrastructure/services/producer.service";
import { IEventService } from "@/module/domain/services/event.service";
import { BaseController } from "@/module/domain/controllers/base.controller";
import { ExampleUseCase } from "@/module/application/use-cases/ex.use.case";

export class ExampleController extends BaseController<Request, Response> {
  private static pubSub: IEventBus = new PubSubClass();
  private static eventService: IEventService = new ProducerService(
    ExampleController.pubSub
  );

  private constructor() {
    super();
  }

  static async execute(message: any): Promise<string> {
    const messageId = await ExampleUseCase.Create(
      ExampleController.eventService
    ).execute(message);

    return messageId;
  }
}
