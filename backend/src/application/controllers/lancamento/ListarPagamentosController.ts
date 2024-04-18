import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import { ListarPagamentos } from '../../../domain/implementations/usecase/lancamentos/listarPagamentos/ListarPagamentos';
import { ListarPagamentosInput } from '../../../domain/implementations/usecase/lancamentos/listarPagamentos/ListarPagamentosInput';
import IController from '../../../domain/protocols/services/Controller';


export class ListarPagamentosController implements IController {
  constructor(private useCase: ListarPagamentos) { }

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork(pData.tokenAuthorization);
    try {
      const listarPagamentosInput = new ListarPagamentosInput({
        body: pData.body,
        parametros: pData.parametros,
        tokenAuthorization: pData.tokenAuthorization,
      });
      await unitOfWork.init();
      const result = await this.useCase.execute(unitOfWork, listarPagamentosInput);
      await unitOfWork.commit();
      return new EntryPointSuccess('Listagem de pagamentos.', result);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}

