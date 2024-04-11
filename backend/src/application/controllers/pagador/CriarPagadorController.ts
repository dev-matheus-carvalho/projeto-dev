import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointResponse from '../../../domain/implementations/entity/entryPoint/EntryPointResponse';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import { CriarPagador } from '../../../domain/implementations/usecase/pagador/criarPagador/CriarPagador';
import { CriarPagadorInput } from '../../../domain/implementations/usecase/pagador/criarPagador/CriarPagadorInput';
import IController from '../../../domain/protocols/services/Controller';


export class CriarPagadorController implements IController {
  constructor(private useCase: CriarPagador) { }

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork(pData.tokenAuthorization);
    try {
      const inputPagador = new CriarPagadorInput({
        body: pData.body,
        parametros: pData.parametros,
        tokenAuthorization: pData.tokenAuthorization,
      });
      await unitOfWork.init();
      const result = await this.useCase.execute(unitOfWork, inputPagador);
      await unitOfWork.commit();
      return new EntryPointSuccess('Pagador criado com sucesso.', result);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}

