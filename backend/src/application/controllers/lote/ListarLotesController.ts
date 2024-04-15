import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointResponse from '../../../domain/implementations/entity/entryPoint/EntryPointResponse';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import { ListarLotes } from '../../../domain/implementations/usecase/lote/listarLotes/ListarLotes';
import { ListarLotesInput } from '../../../domain/implementations/usecase/lote/listarLotes/ListarLotesInput';
import IController from '../../../domain/protocols/services/Controller';

export class ListarLotesController implements IController {
  constructor(private useCase: ListarLotes) { }

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork(pData.tokenAuthorization);
    try {
      const inputListarLotes = new ListarLotesInput({
        body: pData.body,
        parametros: pData.parametros,
        tokenAuthorization: pData.tokenAuthorization,
      });
      await unitOfWork.init();
      const result = await this.useCase.execute(unitOfWork, inputListarLotes);
      await unitOfWork.commit();
      if (result) {
        return new EntryPointSuccess('Lista de lotes', result);
      }
      return new EntryPointResponse(false, 400, 'Não foi possível listar lotes!', result, null);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}

