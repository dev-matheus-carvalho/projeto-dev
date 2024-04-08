import db from '../db';
import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';

import { Titulo } from '../../../domain/implementations/entity/objectValues/Titulo';
import ITituloRepository from '../../../domain/protocols/repository/tituloRepository';
import TituloSequelizeModel from '../models/TituloSequelizeModel';

export default class TituloSequelizeRepository implements ITituloRepository {
  
  public async criar(pUnitOfWork: UnitOfWork, pTitulo: Titulo): Promise<Titulo> {
    const tituloDb = await db.models.titulo.create(pTitulo.gerarObjCriar(), {
      transaction: pUnitOfWork.getTransition(),
    });

    return new Titulo(tituloDb);
  }

  public async buscarTituloPorNumeroDoTitulo(pTitulo: string): Promise<Titulo | null> {
    const tituloDb = await db.models.titulo.findOne<TituloSequelizeModel>({
      where: {
        numeroTitulo: pTitulo,
      }
    });
    if (tituloDb) {
      return Promise.resolve(new Titulo(tituloDb));
    }
    return null;
  }

  public async listarTitulosPorLote(pIdLote: string, pEmail: string): Promise<Array<Titulo>> {
    const tituloDb = await db.models.titulo.findAll<TituloSequelizeModel>({
      where: {
        idLote: pIdLote,
        email: pEmail
      }
    });
     return tituloDb.map((titulo) => new Titulo(titulo));
  }
}
