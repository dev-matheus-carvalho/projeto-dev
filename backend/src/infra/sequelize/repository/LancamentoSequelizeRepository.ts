import db from '../db';
import IUnitOfWork from '../../../domain/protocols/models/UnitOfWork';
import ILancamentoRepository from '../../../domain/protocols/repository/lancamentoRepository';
import { Lancamento } from '../../../domain/implementations/entity/objectValues/Lancamento';

export default class LancamentoSequelizeRepository implements ILancamentoRepository {

  public async criar(pUnitOfWork: IUnitOfWork, pLancamento: Lancamento): Promise<Lancamento> {
    const lancamentosDb = await db.models.lancamentos.create(pLancamento.gerarObjCriar(), {
      transaction: pUnitOfWork.getTransition(),
    });

    return new Lancamento(lancamentosDb);
  }
}
