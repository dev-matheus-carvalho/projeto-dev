import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import { ReceberPagamento } from '../../../domain/implementations/usecase/lancamentos/receberPagamento/ReceberPagamento';
import { ReceberPagamentoInput } from '../../../domain/implementations/usecase/lancamentos/receberPagamento/ReceberPagamentoInput';
import IController from '../../../domain/protocols/services/Controller';


export class ReceberPagamentoController implements IController {
  constructor(private useCase: ReceberPagamento) { }

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork(pData.tokenAuthorization);
    try {
      const receberPagamentoInput = new ReceberPagamentoInput({
        body: pData.body,
        parametros: pData.parametros,
        tokenAuthorization: pData.tokenAuthorization,
      });
      await unitOfWork.init();
      const result = await this.useCase.execute(unitOfWork, receberPagamentoInput);
      await unitOfWork.commit();
      return new EntryPointSuccess('Pagamento processado com sucesso.', result);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}

