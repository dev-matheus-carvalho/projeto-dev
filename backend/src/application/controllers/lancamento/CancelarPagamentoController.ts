import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import EntrypointData from '../../../domain/implementations/entity/entryPoint/EntryPointData';
import EntryPointSuccess from '../../../domain/implementations/entity/entryPoint/EntryPointSuccess';
import { CancelarPagamento } from '../../../domain/implementations/usecase/lancamentos/cancelarPagamento/CancelarPagamento';
import { CancelarPagamentoInput } from '../../../domain/implementations/usecase/lancamentos/cancelarPagamento/CancelarPagamentoInput';
import { ReceberPagamento } from '../../../domain/implementations/usecase/lancamentos/receberPagamento/ReceberPagamento';
import { ReceberPagamentoInput } from '../../../domain/implementations/usecase/lancamentos/receberPagamento/ReceberPagamentoInput';
import IController from '../../../domain/protocols/services/Controller';


export class CancelarPagamentoController implements IController {
  constructor(private useCase: CancelarPagamento) { }

  public async execute(pData: EntrypointData): Promise<EntryPointSuccess> {
    const unitOfWork = new UnitOfWork(pData.tokenAuthorization);
    try {
      const cancelarPagamentoInput = new CancelarPagamentoInput({
        body: pData.body,
        parametros: pData.parametros,
        tokenAuthorization: pData.tokenAuthorization,
      });
      await unitOfWork.init();
      const result = await this.useCase.execute(unitOfWork, cancelarPagamentoInput);
      await unitOfWork.commit();
      return new EntryPointSuccess('Pagamento cancelado com sucesso.', result);
    } catch (error) {
      await unitOfWork.rollBack();
      return Promise.reject(error);
    }
  }
}

