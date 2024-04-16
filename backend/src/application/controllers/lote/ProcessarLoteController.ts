import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointResponse from '../../../domain/implementations/entity/entryPoint/EntryPointResponse';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import { ProcessarLote } from '../../../domain/implementations/usecase/lote/ProcessarLote/ProcessarLote';
import { ProcessarLoteInput } from '../../../domain/implementations/usecase/lote/ProcessarLote/ProcessarLoteInput';
import IController from '../../../domain/protocols/services/Controller';

export class ProcessarLoteController implements IController {
  constructor(private useCase: ProcessarLote) { }

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork(pData.tokenAuthorization);
    try {
      const inputTitulo = new ProcessarLoteInput({
        body: pData.body,
        parametros: pData.parametros,
        tokenAuthorization: pData.tokenAuthorization,
      });
      await unitOfWork.init();
      const result = await this.useCase.execute(unitOfWork, inputTitulo);
      await unitOfWork.commit();
      return new EntryPointSuccess('Lote processado com sucesso.', result);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}

