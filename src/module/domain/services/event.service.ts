export interface IEventService {
  publish(event: any): Promise<string>;
}
