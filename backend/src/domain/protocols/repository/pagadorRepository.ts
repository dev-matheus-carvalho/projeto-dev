import UnitOfWork from '../../implementations/entity/UnitOfWork';
import { Pagador } from '../../implementations/entity/objectValues/Pagador';

export default interface IPagadorRepository {
  criar(pUnitOfWork: UnitOfWork, pPagador: Pagador): Promise<Pagador>;
  
  buscarPagador(pUnitOfWork: UnitOfWork, pIdPagador: string, pIdConta: string): Promise<Pagador | null>;
  
  verificarSePagadorExiste(pUnitOfWork: UnitOfWork, pIdPagador: string, pIdentificacao: string, pIdConta: string): Promise<Pagador | null>;
  verificarPagadorPorIdentificacao(pUnitOfWork: UnitOfWork, pIdentificacao: string, pIdConta: string): Promise<Pagador | null>;
  editarNomePagador(pUnitOfWork: UnitOfWork, pNome: string, pIdPagador: string, pIdConta: string): Promise<boolean>;
}
