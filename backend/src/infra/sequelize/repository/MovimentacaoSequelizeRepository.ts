import db from '../db';
import IUnitOfWork from '../../../domain/protocols/models/UnitOfWork';
import IMovimentacaoRepository from '../../../domain/protocols/repository/movimentacaoRepository';
import { Movimentacao } from '../../../domain/implementations/entity/objectValues/Movimentacao';

export default class MovimentacaoSequelizeRepository implements IMovimentacaoRepository {

  public async criar(pUnitOfWork: IUnitOfWork, pMovimentacao: Movimentacao): Promise<Movimentacao> {
    const movimentacaoDb = await db.models.movimentacao.create(pMovimentacao.gerarObjCriar(), {
      transaction: pUnitOfWork.getTransition(),
    });

    return new Movimentacao(movimentacaoDb);
  }
}
