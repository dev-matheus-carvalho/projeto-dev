import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import IController from '../../../domain/protocols/services/Controller';
import { Login } from '../../../domain/implementations/usecase/conta/login/Login';
import { LoginInput } from '../../../domain/implementations/usecase/conta/login/LoginInput';

export class LoginController implements IController {
  constructor(private useCase: Login) { }

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork(pData.tokenAuthorization);
    try {
      const inputLogin = new LoginInput({
        body: pData.body,
        parametros: pData.parametros,
        tokenAuthorization: pData.tokenAuthorization,
      });
      const result = await this.useCase.execute(unitOfWork, inputLogin);
      await unitOfWork.commit();
      return new EntryPointSuccess('Login realizado com sucesso.', result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

