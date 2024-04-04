import UnitOfWork from '../../implementations/entity/UnitOfWork';
import { Titulo } from '../../implementations/entity/objectValues/Titulo';

export default interface ITituloRepository {
  criar(pUnitOfWork: UnitOfWork, pTitulo: Titulo): Promise<Titulo>;
  buscarTituloPorNumeroDoTitulo(pTitulo: string): Promise<Titulo | null>;
  // listarPagadorPorEmail(pPagador: string): Promise<Titulo | null>;
  // editar(pUnitOfWork: UnitOfWork, pPagador: Titulo): Promise<boolean>;
}
