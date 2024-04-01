import db from '../db';

import { Conta } from '../../../domain/implementations/entity/objectValues/Conta';
import IUnitOfWork from '../../../domain/protocols/models/UnitOfWork';
import IContaRepository from '../../../domain/protocols/repository/contaRepository';
import ContaSequelizeModel from '../models/ContaSequelizeModels';

export default class ContaSequelizeRepository implements IContaRepository {
  public async criar(pUnitOfWork: IUnitOfWork, pConta: Conta): Promise<Conta> {
    const contaDb = await db.models.conta.create(pConta.gerarObjCriar(), {
      transaction: pUnitOfWork.getTransition(),
    });

    return new Conta(contaDb);
  }

  public async buscaContaPorEmail(pUnitOfWork: IUnitOfWork, pEmail: string): Promise<Conta | null> {
    const contaDb = await db.models.conta.findOne({
      where: { email: pEmail },
      transaction: pUnitOfWork.getTransition(),
    });
    return contaDb ? new Conta(contaDb) : null;
  }

  public async listarContaPorEmail(pEmail: string): Promise<Conta | null> {
    const contaDb = await db.models.conta.findOne<ContaSequelizeModel>({
      where: {
        email: pEmail,
      }
    });
    if (contaDb) {
      return Promise.resolve(new Conta(contaDb));
    }
    return null;
  }

  public async verificaSenhaLogin(pEmail: string, pSenha: string): Promise<Conta | null> {
    const contaDb = await db.models.conta.findOne<ContaSequelizeModel>({
      where: {
        email: pEmail,
        senha: pSenha,
      }
    });
    if (contaDb) {
      return Promise.resolve(new Conta(contaDb));
    }
    return null;
  }
}
