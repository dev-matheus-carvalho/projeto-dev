import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointResponse from '../../../domain/implementations/entity/entryPoint/EntryPointResponse';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import { BuscarPagador } from '../../../domain/implementations/usecase/pagador/buscarPagador/BuscarPagador';
import { BuscarPagadorInput } from '../../../domain/implementations/usecase/pagador/buscarPagador/BuscarPagadorInput';
import IController from '../../../domain/protocols/services/Controller';


export class BuscarPagadorController implements IController {
  constructor(private useCase: BuscarPagador) { }

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork(pData.tokenAuthorization);
    try {
      const inputPagador = new BuscarPagadorInput({
        body: pData.body,
        parametros: pData.parametros,
        tokenAuthorization: pData.tokenAuthorization,
      });
      await unitOfWork.init();
      const result = await this.useCase.execute(inputPagador);
      await unitOfWork.commit();
      if (result) {
        return new EntryPointSuccess('Pagador encontrado com sucesso.', result);
      }
      return new EntryPointResponse(false, 400, 'Pagador não foi cadastrado!', result, null);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}

