import RootController from '../../../application/controllers/root/RootController';
import UnitOfWork from '../../implementations/entity/UnitOfWork';
import { Lancamento } from '../../implementations/entity/objectValues/Lancamento';
import { Movimentacao } from '../../implementations/entity/objectValues/Movimentacao';

export default interface IMovimentacaoRepository {
  criar(pUnitOfWork: UnitOfWork, pMovimentacao: Movimentacao): Promise<Movimentacao>;
  buscarMovimentacao(pUnitOfWork: UnitOfWork, pIdTitulo: string, pIdConta: string): Promise<Movimentacao | null>;

  editar(pUnitOfWork: UnitOfWork, pMovimentacao: Movimentacao, pLancamento: Lancamento): Promise<boolean>; // Apagar
  receberPagamento(pUnitOfWork: UnitOfWork, pMovimentacao: Movimentacao, pLancamento: Lancamento): Promise<boolean>;
  cancelarPagamento(pUnitOfWork: UnitOfWork, pMovimentacao: Movimentacao, pLancamento: Lancamento): Promise<boolean>;

  quitarSaldo(pUnitOfWork: UnitOfWork, pMovimentacao: Movimentacao): Promise<boolean>;
}