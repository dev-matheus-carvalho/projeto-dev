import UnitOfWork from '../../implementations/entity/UnitOfWork';
import { Titulo } from '../../implementations/entity/objectValues/Titulo';

export default interface ITituloRepository {
  criar(pUnitOfWork: UnitOfWork, pTitulo: Titulo): Promise<Titulo>;
  listarTitulosPorLote(pUnitOfWork: UnitOfWork, pIdLote: string, IdConta: string): Promise<Titulo[]>;
  verificarSeExisteTitulo(pUnitOfWork: UnitOfWork, pTitulo: Titulo): Promise<Titulo | null>;
  editar(pUnitOfWork: UnitOfWork, pIdTitulo: Titulo): Promise<boolean>;
  excluir(pUnitOfWork: UnitOfWork, pIdTitulo: string, pIdConta: string): Promise<boolean>;
  editarSituacaoTitulos(pUnitOfWork: UnitOfWork, pIdLote: string, pIdConta: string): Promise<boolean>;
  buscarTituloPorIdTitulo(pUnitOfWork: UnitOfWork, pIdTitulo: string): Promise<Titulo | null>;

  excluirTitulosPorLote(pUnitOfWork: UnitOfWork, pIdTitulo: string, pEmail: string, pIdLote: string): Promise<boolean>;
  buscarTituloPorEmailDoTitulo(pEmail: string): Promise<Titulo | null>;
  buscarTituloPorEmailEPagadorDoTitulo(pEmail: string, pPagador: string): Promise<Titulo | null>;
}
