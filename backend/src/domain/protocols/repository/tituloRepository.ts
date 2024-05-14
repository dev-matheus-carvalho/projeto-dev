import { SituacaoTituloEnum } from '../../implementations/constants/enum/situacaoTituloEnum';
import UnitOfWork from '../../implementations/entity/UnitOfWork';
import { Titulo } from '../../implementations/entity/objectValues/Titulo';

export default interface ITituloRepository {
  criar(pUnitOfWork: UnitOfWork, pTitulo: Titulo): Promise<Titulo>;
  listarTitulosPorLote(pUnitOfWork: UnitOfWork, pIdLote: string, IdConta: string): Promise<Titulo[]>;
  listarTitulosProcessados(pUnitOfWork: UnitOfWork, IdConta: string): Promise<Titulo[]>;
  
  verificarSeExisteTitulo(pUnitOfWork: UnitOfWork, pIdTitulo: string, pIdConta: string): Promise<Titulo | null>;
  
  editar(pUnitOfWork: UnitOfWork, pIdTitulo: Titulo): Promise<boolean>;
  atualizarVencimento(pUnitOfWork: UnitOfWork, pIdTitulo: Titulo): Promise<boolean>;
  excluir(pUnitOfWork: UnitOfWork, pIdTitulo: string, pIdConta: string): Promise<boolean>;
  editarSituacaoTitulos(pUnitOfWork: UnitOfWork, pIdLote: string, pIdConta: string): Promise<boolean>;
  quitarTitulo(pUnitOfWork: UnitOfWork, pTitulo: Titulo): Promise<boolean>;
  
  cancelarPagamento(pUnitOfWork: UnitOfWork, pTitulo: Titulo): Promise<boolean>; // Apagar depois
  setarSituacaoDeVencimentoDoTitulo(pUnitOfWork: UnitOfWork, pIdTitulo: string, pSituacao: string, pIdConta: string): Promise<boolean>;
  
  buscarTituloPorIdTitulo(pUnitOfWork: UnitOfWork, pIdTitulo: string): Promise<Titulo | null>;
  excluirTitulosPorLote(pUnitOfWork: UnitOfWork, pIdLote: string, pIdConta: string,): Promise<boolean>;

  buscarTituloPorEmailDoTitulo(pEmail: string): Promise<Titulo | null>;
  buscarTituloPorEmailEPagadorDoTitulo(pEmail: string, pPagador: string): Promise<Titulo | null>;
}
