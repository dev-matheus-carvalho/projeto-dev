import RootUsecaseOutput from './root.usecase.output';

export default class RootUsecase {
  public async execute(): Promise<RootUsecaseOutput> {
    return new RootUsecaseOutput(true);
  }
}
