import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointResponse from '../../../domain/implementations/entity/entryPoint/EntryPointResponse';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import { CriarPagador } from '../../../domain/implementations/usecase/pagador/criarPagador/CriarPagador';
import { CriarPagadorInput } from '../../../domain/implementations/usecase/pagador/criarPagador/CriarPagadorInput';
import { CriarTitulo } from '../../../domain/implementations/usecase/titulo/criarTitulo/CriarTitulo';
import { CriarTituloInput } from '../../../domain/implementations/usecase/titulo/criarTitulo/CriarTituloInput';
import IController from '../../../domain/protocols/services/Controller';


export class CriarTituloController implements IController {
  constructor(private useCase: CriarTitulo) { }

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork(pData.tokenAuthorization);
    try {
      const inputTitulo = new CriarTituloInput({
        body: pData.body,
        parametros: pData.parametros,
        tokenAuthorization: pData.tokenAuthorization,
      });
      await unitOfWork.init();
      const result = await this.useCase.execute(unitOfWork, inputTitulo);
      await unitOfWork.commit();
      return new EntryPointSuccess('Titulo criado com sucesso.', result);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}

