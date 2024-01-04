import { IEventService } from "@/module/domain/services/event.service";
import { UseCase } from "@/module/domain/use-cases/use.case";

export class ExampleUseCase extends UseCase<any, string> {
  constructor(private eventService: IEventService) {
    super();
  }

  static Create(eventService: IEventService) {
    return new ExampleUseCase(eventService);
  }

  async execute(data: any): Promise<string> {
    return await this.eventService.publish(data);
  }
}
