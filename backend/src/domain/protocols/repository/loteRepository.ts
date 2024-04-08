import UnitOfWork from '../../implementations/entity/UnitOfWork';
import { Lote } from '../../implementations/entity/objectValues/Lote';

export default interface ILoteRepository {
  criar(pUnitOfWork: UnitOfWork, pLote: Lote): Promise<Lote>;
  buscaLotePorId(pUnitOfWork: UnitOfWork, pId: string): Promise<Lote | null>;
}