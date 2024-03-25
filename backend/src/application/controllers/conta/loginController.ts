import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import LoginInput from '../../../domain/implementations/usecase/conta/login/login.input';
import LoginUsecase from '../../../domain/implementations/usecase/conta/login/login.usecase';
import IController from '../../../domain/protocols/services/Controller';

export default class LoginController implements IController {
  constructor(private useCase: LoginUsecase) {}

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork();
    try {
      const input = new LoginInput(pData);
      const result = await this.useCase.execute(unitOfWork, input);

      return new EntryPointSuccess('Login realizado com sucesso.', result);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}
