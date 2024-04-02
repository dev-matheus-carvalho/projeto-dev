import UnitOfWork from '../../implementations/entity/UnitOfWork';
import { Pagador } from '../../implementations/entity/objectValues/Pagador';

export default interface IPagadorRepository {
  criar(pUnitOfWork: UnitOfWork, pPagador: Pagador): Promise<Pagador>;
  listarPagadorPorIdentificacao(pPagador: string): Promise<Pagador | null>;
  listarPagadorPorEmail(pPagador: string): Promise<Pagador | null>;
  editar(pUnitOfWork: UnitOfWork, pPagador: Pagador): Promise<boolean>;
}
