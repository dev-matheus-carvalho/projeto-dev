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

  public async verificarSeLancamentoExiste(pUnitOfWork: IUnitOfWork, pIdLancamento: string): Promise<Lancamento | null> {
    const lancamentoDb = await db.models.lancamentos.findOne<LancamentosSequelizeModel>({
      where: {
        idLancamento: pIdLancamento,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return lancamentoDb ? new Lancamento(lancamentoDb) : null;
  }

  public async editarLancamento(pUnitOfWork: IUnitOfWork, pIdLancamento: string, pIdTitulo: string, pIdConta: string): Promise<boolean> {
    const result = await db.models.lancamentos.update<LancamentosSequelizeModel>(
      {
        ativo: false,
      }, 
      {
      where: {
        idLancamento: pIdLancamento,
        idTitulo: pIdTitulo,
        idConta: pIdConta,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result.length > 0);
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
