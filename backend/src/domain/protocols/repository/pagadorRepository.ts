import UnitOfWork from '../../implementations/entity/UnitOfWork';
import { Pagador } from '../../implementations/entity/objectValues/Pagador';

export default interface IPagadorRepository {
  criar(pUnitOfWork: UnitOfWork, pPagador: Pagador): Promise<Pagador>;
  buscarPagador(pUnitOfWork: UnitOfWork, pPagador: Pagador): Promise<Pagador | null>;
  verificarSePagadorExiste(pUnitOfWork: UnitOfWork, pPagador: Pagador): Promise<Pagador | null>;
  editar(pUnitOfWork: UnitOfWork, pPagador: Pagador): Promise<boolean>;
}
