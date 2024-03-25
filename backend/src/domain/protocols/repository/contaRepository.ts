import Conta from '../../implementations/entity/objectValues/Conta';
import IUnitOfWork from '../models/UnitOfWork';

export default interface IContaRepository {
  buscaContaPorEmail(pUnitOfWork: IUnitOfWork, pEmail: string): Promise<Conta | null>;
  criar(pUnitOfWork: IUnitOfWork, pConta: Conta): Promise<Conta>;
}
