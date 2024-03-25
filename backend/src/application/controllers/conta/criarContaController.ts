import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import CriarContaInput from '../../../domain/implementations/usecase/conta/criarConta/criarConta.input';
import CriarContaUsecase from '../../../domain/implementations/usecase/conta/criarConta/criarConta.usecase';
import IController from '../../../domain/protocols/services/Controller';

export default class CriarContaController implements IController {
  constructor(private useCase: CriarContaUsecase) {}

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork();
    try {
      const input = new CriarContaInput(pData);
      const result = await this.useCase.execute(unitOfWork, input);

      return new EntryPointSuccess('Conta criada com sucesso.', result);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}
