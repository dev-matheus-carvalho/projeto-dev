import UnitOfWork from '../../implementations/entity/UnitOfWork';
import { Conta } from '../../implementations/entity/objectValues/Conta';

export default interface IContaRepository {
  criar(pUnitOfWork: UnitOfWork, pConta: Conta): Promise<Conta>;
  verificarContaExistente(pUnitOfWork: UnitOfWork, pEmail: string): Promise<Conta | null>;
  verificaSenhaLogin(pUnitOfWork: UnitOfWork, pEmail: string, pSenha: string): Promise<Conta | null>;
  buscarUsuario(pUnitOfWork: UnitOfWork, pIdConta: string): Promise<Conta | null>;
}
