import RootController from '../../../application/controllers/root/RootController';
import UnitOfWork from '../../implementations/entity/UnitOfWork';
import { Lote } from '../../implementations/entity/objectValues/Lote';

export default interface ILoteRepository {
  criar(pUnitOfWork: UnitOfWork, pLote: Lote): Promise<Lote>;
  buscaLotePorId(pUnitOfWork: UnitOfWork, pIdLote: string): Promise<Lote | null>;
  editarValorTotalDeTitulosPorLote(pUnitOfWork: UnitOfWork, pIdLote: string, pValor: number, pQtd: number): Promise<boolean>;
  editarLoteParaProcessado(pUnitOfWork: UnitOfWork, pIdLote: string, pIdConta: string, pDate: Date): Promise<boolean>;
  listarLotes(pEmail: string): Promise<Array<Lote>>;
}
