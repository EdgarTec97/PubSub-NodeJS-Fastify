import { IEventService } from "../../domain/services/event.service";
import { UseCase } from "../../domain/use-cases/use.case";

export class ExampleUseCase extends UseCase<any, string> {
  constructor(private eventService: IEventService) {
    super();
  }

  static Create(eventService: IEventService) {
    return new ExampleUseCase(eventService);
  }

  async execute(data: any): Promise<string> {
    return await this.eventService.publish(data.attributes);
  }
}
