import { Kafka, Consumer, Producer, logLevel } from "kafkajs";
import { IEventBus } from "@/module/domain/event-bus/event.bus";
import config from "@/module/infrastructure/config/config";

export class KafkaEventBussClass implements IEventBus {
  private connection: Kafka;
  private config: typeof config.KAFKA;
  private consumer: Consumer;
  private producer: Producer;

  constructor() {
    this.config = config.KAFKA;

    this.connection = new Kafka({
      //clientId: this.config.clientId,
      brokers: this.config.brokers
        .split(",")
        .map((host: any) => host.replace("kafka+ssl://", "")),
      requestTimeout: 25000,
      logLevel: logLevel.ERROR,
      ...(this.config.trustedCert &&
      this.config.clientCertKey &&
      this.config.clientCert
        ? {
            ssl: {
              rejectUnauthorized: false,
              ca: Buffer.from(this.config.trustedCert, "base64"),
              key: Buffer.from(this.config.clientCertKey, "base64"),
              cert: Buffer.from(this.config.clientCert, "base64"),
            },
          }
        : {}),
    });

    this.consumer = this.connection.consumer({ groupId: this.config.groupId });
    this.producer = this.connection.producer();

    this.subscribe(<string>this.config.topic_consumer);
  }

  public async publish(topicName: string, message: string): Promise<string> {
    await this.producer.connect();

    const data = await this.producer
      .sendBatch({
        topicMessages: [
          {
            topic: topicName,
            messages: [{ key: topicName, value: message }],
          },
        ],
      })
      .catch((e) => [{ message: "PERRA" }]);

    return JSON.stringify(data[0]);
  }

  public async subscribe(topicName: string): Promise<void> {
    await this.consumer.connect();

    await this.consumer.subscribe({ topic: topicName });

    await this.consumer.run({
      eachMessage: async ({ partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          key: message.key?.toString(),
          message: "############ MESSAGE #############",
          value: message?.value?.toString() || "#### MESSAGE #####",
        });
      },
    });
  }
}
