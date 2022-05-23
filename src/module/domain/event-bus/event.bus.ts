export interface IEventBus {
  publish(topicName: string, message: string): Promise<string>;
  subscribe(topicName: string, callback: (message: any) => void): Promise<void>;
}
