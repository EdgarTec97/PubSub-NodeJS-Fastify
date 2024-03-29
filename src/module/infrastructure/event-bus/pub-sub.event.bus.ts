import { PubSub, Message } from "@google-cloud/pubsub";
import { IEventBus } from "@/module/domain/event-bus/event.bus";
import config from "@/module/infrastructure/config/config";

export class PubSubClass implements IEventBus {
  private pubSubClient: PubSub;
  private google: typeof config.CLOUD.google;

  constructor() {
    this.google = config.CLOUD.google;

    this.pubSubClient = new PubSub({
      projectId: this.google.projectId,
      credentials: {
        type: this.google.credentialType,
        private_key: this.google.privateKey,
        client_email: this.google.email,
        client_id: this.google.clientId,
      },
    });

    this.subscribe(<string>this.google.topic, this.handler);
  }

  public publish(topicName: string, message: string): Promise<string> {
    return this.pubSubClient.topic(topicName).publishMessage({
      data: Buffer.from(message),
    });
  }

  public async subscribe(
    topicName: string,
    callback: (message: any) => void
  ): Promise<void> {
    const subscriptionName = <string>this.google.subscription?.split(",")[0];
    /* const isSubscription = await this.doesSubscriptionExist(subscriptionName);

    if (!isSubscription)
      await this.pubSubClient
        .topic(topicName)
        .createSubscription(subscriptionName);*/

    const subscription = this.pubSubClient.subscription(subscriptionName);

    subscription.on(`message`, callback);
  }

  private handler(message: Message) {
    console.info(`####################################################
    \nReceived message: ${message.id}
    \nData: ${message.data}
    \ntAttributes: ${message.attributes}
    \n####################################################`);

    message.ack();
  }

  private async doesSubscriptionExist(
    subscriptionName: string
  ): Promise<boolean> {
    const subscriptions = await this.pubSubClient.getSubscriptions();
    const subscriptionExist = subscriptions.find((sub: any) =>
      sub[0].name.includes(subscriptionName)
    );

    return <boolean>(subscriptions && subscriptionExist);
  }

  private async createTopic(topicName: string) {
    // Creates a new topic
    await this.pubSubClient.createTopic(topicName);
    console.info(`Topic ${topicName} created.`);
  }

  private async doesTopicExist(topicName: string) {
    const topics = await this.pubSubClient.getTopics();
    const topicExists = topics.find((topic: any) => topic.name === topicName);

    return topics && topicExists;
  }
}
