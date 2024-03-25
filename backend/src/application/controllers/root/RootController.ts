import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import RootUsecase from '../../../domain/implementations/usecase/root/root/root.usecase';
import IController from '../../../domain/protocols/services/Controller';

export default class RootController implements IController {
  constructor(private useCase: RootUsecase) {}

  public async execute(): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork();
    try {
      const result = await this.useCase.execute();

      return new EntryPointSuccess('Sistema funcionando.', result);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}
