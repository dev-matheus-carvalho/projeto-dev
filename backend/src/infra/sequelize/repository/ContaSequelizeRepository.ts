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

  public async verificarContaExistente(pUnitOfWork: IUnitOfWork, pConta: Conta): Promise<Conta | null> {
    const contaDb = await db.models.conta.findOne({
      where: {
        email: pConta.email
       },
      transaction: pUnitOfWork.getTransition(),
    });
    return contaDb ? new Conta(contaDb) : null;
  }

  public async buscarUsuario(pUnitOfWork: IUnitOfWork, pIdConta: string): Promise<Conta | null> {
    const contaDb = await db.models.conta.findOne({
      where: {
        idConta: pIdConta,
       },
      transaction: pUnitOfWork.getTransition(),
    });
    return contaDb ? new Conta(contaDb) : null;
  }

  public async verificaSenhaLogin(pUnitOfWork: IUnitOfWork, pConta: Conta): Promise<Conta | null> {
    const contaDb = await db.models.conta.findOne<ContaSequelizeModel>({
      where: {
        email: pConta.email,
        senha: pConta.senha,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return contaDb ? new Conta(contaDb) : null;
  }
}
