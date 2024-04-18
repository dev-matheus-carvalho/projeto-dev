import db from '../db';
import IUnitOfWork from '../../../domain/protocols/models/UnitOfWork';
import ILancamentoRepository from '../../../domain/protocols/repository/lancamentoRepository';
import { Lancamento } from '../../../domain/implementations/entity/objectValues/Lancamento';
import LancamentosSequelizeModel from '../models/LancamentosSequelizeModel';

export default class LancamentoSequelizeRepository implements ILancamentoRepository {

  public async criar(pUnitOfWork: IUnitOfWork, pLancamento: Lancamento): Promise<Lancamento> {
    const lancamentosDb = await db.models.lancamentos.create(pLancamento.gerarObjCriar(), {
      transaction: pUnitOfWork.getTransition(),
    });

    return new Lancamento(lancamentosDb);
  }

  public async listarPagamentos(pUnitOfWork: IUnitOfWork, pIdTitulo: string, pIdConta: string): Promise<Lancamento[]> {
    const lancamentoDb = await db.models.lancamentos.findAll<LancamentosSequelizeModel>({
      where: {
        idTitulo: pIdTitulo,
        idConta: pIdConta,
      },
      transaction: pUnitOfWork.getTransition(),
    });
     return lancamentoDb.map((lancamento) => new Lancamento(lancamento));
  }
}
