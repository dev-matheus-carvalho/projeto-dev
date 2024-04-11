import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointResponse from '../../../domain/implementations/entity/entryPoint/EntryPointResponse';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import { CriarConta } from '../../../domain/implementations/usecase/conta/criarConta/CriarConta';
import { CriarContaInput } from '../../../domain/implementations/usecase/conta/criarConta/CriarContaInput';
import IController from '../../../domain/protocols/services/Controller';


export class CriarContaController implements IController {
  constructor(private useCase: CriarConta) { }

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork(pData.tokenAuthorization);
    try {
      const inputConta = new CriarContaInput({
        body: pData.body,
        parametros: pData.parametros,
        tokenAuthorization: pData.tokenAuthorization,
      });
      await unitOfWork.init();
      const result = await this.useCase.execute(unitOfWork, inputConta);
      await unitOfWork.commit();

      return new EntryPointSuccess('Conta criada com sucesso.', result);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}

