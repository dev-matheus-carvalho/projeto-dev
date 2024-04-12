import { ErrorCodeEnum } from '../../../domain/protocols/Enum/ErrorCodeEnum';
import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointFail from '../../../domain/implementations/entity/entryPoint/EntryPointFail';
import EntryPointResponse from '../../../domain/implementations/entity/entryPoint/EntryPointResponse';
import EntryPointResponseError from '../../../domain/implementations/entity/entryPoint/EntryPointResponseError';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import IController from '../../../domain/protocols/services/Controller';

import { EditarPagadorInput } from '../../../domain/implementations/usecase/pagador/editarPagador/EditarPagadorInput';
import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import { EditarPagador } from '../../../domain/implementations/usecase/pagador/editarPagador/EditarPagador';

export class EditarPagadorController implements IController {
  constructor(private useCase: EditarPagador) { }

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork(pData.tokenAuthorization);;
    try {
      const inputPagador = new EditarPagadorInput({
        body: pData.body,
        parametros: pData.parametros,
        tokenAuthorization: pData.tokenAuthorization,
      });

      await unitOfWork.init();
      const result = await this.useCase.execute(unitOfWork, inputPagador);
      await unitOfWork.commit();
      return new EntryPointSuccess('Pagador editado com sucesso.', result);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}

