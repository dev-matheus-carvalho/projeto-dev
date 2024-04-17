import db from '../db';
import IUnitOfWork from '../../../domain/protocols/models/UnitOfWork';
import IMovimentacaoRepository from '../../../domain/protocols/repository/movimentacaoRepository';
import { Movimentacao } from '../../../domain/implementations/entity/objectValues/Movimentacao';
import MovimentacaoSequelizeModel from '../models/MovimentacaoSequelizeModel';

export default class MovimentacaoSequelizeRepository implements IMovimentacaoRepository {

  public async criar(pUnitOfWork: IUnitOfWork, pMovimentacao: Movimentacao): Promise<Movimentacao> {
    const movimentacaoDb = await db.models.movimentacao.create(pMovimentacao.gerarObjCriar(), {
      transaction: pUnitOfWork.getTransition(),
    });

    return new Movimentacao(movimentacaoDb);
  }

  public async editar(pUnitOfWork: IUnitOfWork, pMovimentacao: Movimentacao): Promise<boolean> {
    const result = await db.models.movimentacao.update<MovimentacaoSequelizeModel>(pMovimentacao.gerarObjAtualizar(), {
      where: {
        idMovimentacao: pMovimentacao.idMovimentacao,
        idTitulo: pMovimentacao.idTitulo,
        idConta: pMovimentacao.idConta,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result.length > 0);
  }
}
