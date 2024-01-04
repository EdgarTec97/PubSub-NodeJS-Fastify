import { IEventBus } from "@/module/domain/event-bus/event.bus";
import { IEventService } from "@/module/domain/services/event.service";
import config from "@/module/infrastructure/config/config";

export class ProducerService implements IEventService {
  constructor(private readonly eventBus: IEventBus) {}

  public async publish(event: any): Promise<string> {
    const topicName = config.KAFKA.topic_producer; /*config.CLOUD.google.topic*/

    const messageId = await this.eventBus.publish(
      <string>topicName,
      JSON.stringify(event)
    );

    return messageId;
  }
}
