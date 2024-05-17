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

  public async buscarPagador(pUnitOfWork: UnitOfWork, pIdPagador: string, pIdConta: string): Promise<Pagador | null> {
    const pagadorDb = await db.models.pagador.findOne<PagadorSequelizeModel>({
      where: {
        idPagador: pIdPagador,
        idConta: pIdConta,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return pagadorDb ? new Pagador(pagadorDb) : null;
  }

  public async verificarSePagadorExiste(pUnitOfWork: UnitOfWork, pIdPagador: string, pIdentificacao: string, pIdConta: string): Promise<Pagador | null> {
    const pagadorDb = await db.models.pagador.findOne<PagadorSequelizeModel>({
          where: {
            idPagador: pIdPagador,
            identificacao: pIdentificacao,
            idConta: pIdConta,
          },
          transaction: pUnitOfWork.getTransition(),
        });
        return pagadorDb ? new Pagador(pagadorDb) : null;
  }

  public async verificarPagadorPorIdentificacao(pUnitOfWork: UnitOfWork, pIdentificacao: string, pIdConta: string): Promise<Pagador | null> {
    const pagadorDb = await db.models.pagador.findOne<PagadorSequelizeModel>({
          where: {
            identificacao: pIdentificacao,
            idConta: pIdConta,
          },
          transaction: pUnitOfWork.getTransition(),
        });
        return pagadorDb ? new Pagador(pagadorDb) : null;
  }

  async editarNomePagador(pUnitOfWork: UnitOfWork, pNome: string, pIdPagador: string, pIdConta: string): Promise<boolean> {
    const result = await db.models.pagador.update<PagadorSequelizeModel>({
      nome: pNome,
    }, {
      where: {
        idPagador: pIdPagador,
        idConta: pIdConta
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result.length > 0);
  }
}
