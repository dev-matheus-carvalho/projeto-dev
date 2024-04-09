import UnitOfWork from '../../implementations/entity/UnitOfWork';
import { Titulo } from '../../implementations/entity/objectValues/Titulo';

export default interface ITituloRepository {
  criar(pUnitOfWork: UnitOfWork, pTitulo: Titulo): Promise<Titulo>;
  buscarTituloPorNumeroDoTitulo(pTitulo: string): Promise<Titulo | null>;
  buscarTituloPorIdDoTituloEEmail(pIdTitulo: string, pEmail: string): Promise<Titulo | null>;
  buscarTituloPorEmailDoTitulo(pEmail: string): Promise<Titulo | null>;
  buscarTituloPorEmailEPagadorDoTitulo(pEmail: string, pPagador: string): Promise<Titulo | null>;
  listarTitulosPorLote(pIdLote: string, pEmail: string): Promise<Array<Titulo>>;
  editar(pUnitOfWork: UnitOfWork, pIdTitulo: Titulo): Promise<boolean>;
  excluir(pUnitOfWork: UnitOfWork, pIdTitulo: string, pEmail: string): Promise<boolean>;
  excluirTitulosPorLote(pUnitOfWork: UnitOfWork, pIdTitulo: string, pEmail: string, pIdLote: string): Promise<boolean>;
}
