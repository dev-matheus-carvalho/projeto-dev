import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import IController from '../../../domain/protocols/services/Controller';
import { ListarTitulosPorLote } from '../../../domain/implementations/usecase/titulo/listarTitulosPorLote/ListarTitulosPorLote';
import UnitOfWork from '../../../domain/protocols/models/entity/objectValues/UnitOfWork';
import { ListarTitulosPorLoteInput } from '../../../domain/implementations/usecase/titulo/listarTitulosPorLote/ListarTitulosPorLoteInput';

export class ListarTitulosPorLoteController implements IController {
  constructor(private useCase: ListarTitulosPorLote) { }

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork(pData.tokenAuthorization);;
    try {
      const inputTitulo = new ListarTitulosPorLoteInput({
        body: pData.body,
        parametros: pData.parametros,
        tokenAuthorization: pData.tokenAuthorization,
      });
      await unitOfWork.init();
      const result = await this.useCase.execute(unitOfWork, inputTitulo);
      await unitOfWork.commit();
      return new EntryPointSuccess('Lista de títulos.', result);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}

