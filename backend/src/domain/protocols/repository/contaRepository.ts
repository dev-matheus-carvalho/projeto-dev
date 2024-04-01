import UnitOfWork from '../../implementations/entity/UnitOfWork';
import { Conta } from '../../implementations/entity/objectValues/Conta';

export default interface IContaRepository {
  criar(pUnitOfWork: UnitOfWork, pConta: Conta): Promise<Conta>;
  buscaContaPorEmail(pUnitOfWork: UnitOfWork, pEmail: string): Promise<Conta | null>;
  listarContaPorEmail(pEmail: string): Promise<Conta | null>;
  verificaSenhaLogin(pEmail: string, pSenha: string): Promise<Conta | null>;
}
