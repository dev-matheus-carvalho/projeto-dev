import db from '../db';
// import IUnitOfWork from '../../../domain/protocols/models/UnitOfWork';
import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';
import IMovimentacaoRepository from '../../../domain/protocols/repository/movimentacaoRepository';
import { Movimentacao } from '../../../domain/implementations/entity/objectValues/Movimentacao';
import MovimentacaoSequelizeModel from '../models/MovimentacaoSequelizeModel';
import { Lancamento } from '../../../domain/implementations/entity/objectValues/Lancamento';

export default class MovimentacaoSequelizeRepository implements IMovimentacaoRepository {

  public async criar(pUnitOfWork: UnitOfWork, pMovimentacao: Movimentacao): Promise<Movimentacao> {
    const movimentacaoDb = await db.models.movimentacao.create(pMovimentacao.gerarObjCriar(), {
      transaction: pUnitOfWork.getTransition(),
    });

    return new Movimentacao(movimentacaoDb);
  }

  public async buscarMovimentacao(pUnitOfWork: UnitOfWork, pIdTitulo: string, pIdConta: string): Promise<Movimentacao | null> {
    const movimentacaoDb = await db.models.movimentacao.findOne<MovimentacaoSequelizeModel>({
      where: {
        idTitulo: pIdTitulo,
        idConta: pIdConta,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return movimentacaoDb ? new Movimentacao(movimentacaoDb) : null;
  }

  // Apagar
  public async editar(pUnitOfWork: UnitOfWork, pMovimentacao: Movimentacao, pLancamento: Lancamento): Promise<boolean> {
    const result = await db.models.movimentacao.update<MovimentacaoSequelizeModel>(pMovimentacao.gerarObjAtualizar(pLancamento), {
      where: {
        idMovimentacao: pMovimentacao.idMovimentacao,
        idTitulo: pMovimentacao.idTitulo,
        idConta: pMovimentacao.idConta,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result.length > 0);
  }

  public async receberPagamento(pUnitOfWork: UnitOfWork, pMovimentacao: Movimentacao, pLancamento: Lancamento): Promise<boolean> {
    const result = await db.models.movimentacao.update<MovimentacaoSequelizeModel>(pMovimentacao.gerarObjAtualizarRecebimentoDePagamento(pLancamento), {
      where: {
        idMovimentacao: pMovimentacao.idMovimentacao,
        idTitulo: pMovimentacao.idTitulo,
        idConta: pMovimentacao.idConta,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result.length > 0);
  }

  public async cancelarPagamento(pUnitOfWork: UnitOfWork, pMovimentacao: Movimentacao, pLancamento: Lancamento): Promise<boolean> {
    const result = await db.models.movimentacao.update<MovimentacaoSequelizeModel>(pMovimentacao.gerarObjAtualizarCancelamentoDePagamento(pLancamento), {
      where: {
        idMovimentacao: pMovimentacao.idMovimentacao,
        idTitulo: pMovimentacao.idTitulo,
        idConta: pMovimentacao.idConta,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result.length > 0);
  }

  public async quitarSaldo(pUnitOfWork: UnitOfWork, pMovimentacao: Movimentacao): Promise<boolean> {
    const result = await db.models.movimentacao.update<MovimentacaoSequelizeModel>({
      saldo: 0,
    }, {
      where: {
        idMovimentacao: pMovimentacao.idMovimentacao,
        idConta: pMovimentacao.idConta,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result.length > 0);
  }
}
