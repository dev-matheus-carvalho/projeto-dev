import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointResponse from '../../../domain/implementations/entity/entryPoint/EntryPointResponse';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import IController from '../../../domain/protocols/services/Controller';
import { Login } from '../../../domain/implementations/usecase/conta/login/Login';
import { LoginInput } from '../../../domain/implementations/usecase/conta/login/LoginInput';

export class LoginController implements IController {
  constructor(private useCase: Login) { }

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    try {
      const inputConta = new LoginInput({
        body: pData.body,
        parametros: pData.parametros,
        tokenAuthorization: pData.tokenAuthorization,
      });
      const result = await this.useCase.execute(inputConta);
      if (result) {
        return new EntryPointSuccess('Login realizado com sucesso.', result);
      }
      return new EntryPointResponse(false, 400, 'Email ou senha inválido!', result, null);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

