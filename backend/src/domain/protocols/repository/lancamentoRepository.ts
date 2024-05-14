import RootController from '../../../application/controllers/root/RootController';
import UnitOfWork from '../../implementations/entity/UnitOfWork';
import { Lancamento } from '../../implementations/entity/objectValues/Lancamento';

export default interface ILancamentoRepository {
  criar(pUnitOfWork: UnitOfWork, pLancamento: Lancamento): Promise<Lancamento>;
  listarPagamentos(pUnitOfWork: UnitOfWork, pIdTitulo: string, pIdConta: string): Promise<Lancamento[]>;
  verificarSeLancamentoExiste(pUnitOfWork: UnitOfWork, pIdLancamento: string): Promise<Lancamento | null>;

  editarLancamento(pUnitOfWork: UnitOfWork, pIdLancamento: string, pIdTitulo: string, pIdConta: string): Promise<boolean>; // Apagar
  setarOEstadoDoLancamentoParaInativo(pUnitOfWork: UnitOfWork, pIdLancamento: string, pIdTitulo: string, pIdConta: string): Promise<boolean>;
}