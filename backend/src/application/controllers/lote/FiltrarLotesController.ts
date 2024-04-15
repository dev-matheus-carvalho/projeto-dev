import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointResponse from '../../../domain/implementations/entity/entryPoint/EntryPointResponse';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import { FiltrarLotes } from '../../../domain/implementations/usecase/lote/filtrarLotes/FiltrarLotes';
import { FiltrarLotesInput } from '../../../domain/implementations/usecase/lote/filtrarLotes/FiltrarLotesInput';
import IController from '../../../domain/protocols/services/Controller';

export class FiltrarLotesController implements IController {
  constructor(private useCase: FiltrarLotes) { }

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork(pData.tokenAuthorization);
    try {
      const inputFiltrarLotes = new FiltrarLotesInput({
        body: pData.body,
        parametros: pData.parametros,
        tokenAuthorization: pData.tokenAuthorization,
      });
      await unitOfWork.init();
      const result = await this.useCase.execute(unitOfWork, inputFiltrarLotes);
      await unitOfWork.commit();
      return new EntryPointSuccess('Lotes filtrados com sucesso', result);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}

