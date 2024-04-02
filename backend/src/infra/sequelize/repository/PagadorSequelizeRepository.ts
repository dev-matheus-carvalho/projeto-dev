import db from '../db';
import { Pagador } from '../../../domain/implementations/entity/objectValues/Pagador';
import IUnitOfWork from '../../../domain/protocols/models/UnitOfWork';
import IPagadorRepository from '../../../domain/protocols/repository/pagadorRepository';
import PagadorSequelizeModel from '../models/PagadorSequelizeModel';
import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';

export default class PagadorSequelizeRepository implements IPagadorRepository {
  
  public async criar(pUnitOfWork: IUnitOfWork, pPagador: Pagador): Promise<Pagador> {
    const pagadorDb = await db.models.pagador.create(pPagador.gerarObjCriar(), {
      transaction: pUnitOfWork.getTransition(),
    });

    return new Pagador(pagadorDb);
  }

  public async listarPagadorPorIdentificacao(pPagador: string): Promise<Pagador | null> {
    const pagadorDb = await db.models.pagador.findOne<PagadorSequelizeModel>({
      where: {
        identificacao: pPagador,
      }
    });
    if (pagadorDb) {
      return Promise.resolve(new Pagador(pagadorDb));
    }
    return null;
  }

  public async listarPagadorPorEmail(pPagador: string): Promise<Pagador | null> {
    const pagadorDb = await db.models.pagador.findOne<PagadorSequelizeModel>({
      where: {
        email: pPagador,
      }
    });
    if (pagadorDb) {
      return Promise.resolve(new Pagador(pagadorDb));
    }
    return null;
  }

  async editar(pUnitOfWork: UnitOfWork, pPagador: Pagador): Promise<boolean> {
    const result = await db.models.pagador.update<PagadorSequelizeModel>({
      nome: pPagador.nome,
      identificacao: pPagador.identificacao
    }, {
      where: {
        email: pPagador.email
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result.length > 0);
  }
}
