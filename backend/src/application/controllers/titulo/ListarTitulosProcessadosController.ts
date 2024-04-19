import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import IController from '../../../domain/protocols/services/Controller';
import { ListarTitulosPorLote } from '../../../domain/implementations/usecase/titulo/listarTitulosPorLote/ListarTitulosPorLote';
import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import { ListarTitulosPorLoteInput } from '../../../domain/implementations/usecase/titulo/listarTitulosPorLote/ListarTitulosPorLoteInput';
import { ListarTitulosProcessados } from '../../../domain/implementations/usecase/titulo/listarTitulosProcessados/ListarTitulosProcessados';
import { ListarTitulosProcessadosInput } from '../../../domain/implementations/usecase/titulo/listarTitulosProcessados/ListarTitulosProcessadosInput';

export class ListarTitulosProcessadosController implements IController {
  constructor(private useCase: ListarTitulosProcessados) { }

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork(pData.tokenAuthorization);;
    try {
      const inputTitulo = new ListarTitulosProcessadosInput({
        body: pData.body,
        parametros: pData.parametros,
        tokenAuthorization: pData.tokenAuthorization,
      });
      await unitOfWork.init();
      const result = await this.useCase.execute(unitOfWork, inputTitulo);
      await unitOfWork.commit();
      return new EntryPointSuccess('Lista de títulos Processados.', result);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}

