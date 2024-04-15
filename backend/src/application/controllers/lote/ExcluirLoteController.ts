import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import { ExcluirLote } from '../../../domain/implementations/usecase/lote/excluirLote/ExcluirLote';
import { ExcluirLoteInput } from '../../../domain/implementations/usecase/lote/excluirLote/ExcluirLoteInput';
import IController from '../../../domain/protocols/services/Controller';

export class ExcluirLoteController implements IController {
  constructor(private useCase: ExcluirLote) { }

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork(pData.tokenAuthorization);
    try {
      const inputLote = new ExcluirLoteInput({
        body: pData.body,
        parametros: pData.parametros,
        tokenAuthorization: pData.tokenAuthorization,
      });
      await unitOfWork.init();
      const result = await this.useCase.execute(unitOfWork, inputLote);
      await unitOfWork.commit();
      return new EntryPointSuccess('Lote editado com sucesso.', result);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}

