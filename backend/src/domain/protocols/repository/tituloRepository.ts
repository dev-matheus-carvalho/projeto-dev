import UnitOfWork from '../../implementations/entity/UnitOfWork';
import { Titulo } from '../../implementations/entity/objectValues/Titulo';

export default interface ITituloRepository {
  criar(pUnitOfWork: UnitOfWork, pTitulo: Titulo): Promise<Titulo>;
  buscarTituloPorNumeroDoTitulo(pTitulo: string): Promise<Titulo | null>;
  buscarTituloPorNumeroEEmailDoTitulo(pNumero: string, pEmail: string): Promise<Titulo | null>;
  buscarTituloPorNumeroEmailEPagadorDoTitulo(pNumero: string, pEmail: string, pPagador: string): Promise<Titulo | null>;
  listarTitulosPorLote(pIdLote: string, pEmail: string): Promise<Array<Titulo>>;
  // editar(pUnitOfWork: UnitOfWork, pPagador: Titulo): Promise<boolean>;
}
