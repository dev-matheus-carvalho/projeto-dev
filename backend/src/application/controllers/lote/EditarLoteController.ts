import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointResponse from '../../../domain/implementations/entity/entryPoint/EntryPointResponse';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import { EditarLote } from '../../../domain/implementations/usecase/lote/editarLote/EditarLote';
import { EditarLoteInput } from '../../../domain/implementations/usecase/lote/editarLote/EditarLoteInput';
import IController from '../../../domain/protocols/services/Controller';


export class EditarLoteController implements IController {
  constructor(private useCase: EditarLote) { }

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork(pData.tokenAuthorization);
    try {
      const inputTitulo = new EditarLoteInput({
        body: pData.body,
        parametros: pData.parametros,
        tokenAuthorization: pData.tokenAuthorization,
      });
      await unitOfWork.init();
      const result = await this.useCase.execute(unitOfWork, inputTitulo);
      await unitOfWork.commit();
      if (result) {
        return new EntryPointSuccess('Lote editado com sucesso.', result);
      }
      return new EntryPointResponse(false, 400, 'Não foi possível editar lote!', result, null);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}

