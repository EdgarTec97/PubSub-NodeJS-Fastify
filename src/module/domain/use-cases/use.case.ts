export abstract class UseCase<T, S> {
  abstract execute(...args: T[]): Promise<S>;
}
