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

  public async buscarTituloPorIdDoTituloEEmail(pIdTitulo: string, pEmail: string): Promise<Titulo | null> {
    const tituloDb = await db.models.titulo.findOne<TituloSequelizeModel>({
      where: {
        idTitulo: pIdTitulo,
        email: pEmail,
      }
    });
    if (tituloDb) {
      return Promise.resolve(new Titulo(tituloDb));
    }
    return null;
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

  public async buscarTituloPorEmailDoTitulo(pEmail: string): Promise<Titulo | null> {
    const tituloDb = await db.models.titulo.findOne<TituloSequelizeModel>({
      where: {
        email: pEmail,
      }
    });
    if (tituloDb) {
      return Promise.resolve(new Titulo(tituloDb));
    }
    return null;
  }

  public async buscarTituloPorEmailEPagadorDoTitulo(pEmail: string, pPagador: string): Promise<Titulo | null> {
    const tituloDb = await db.models.titulo.findOne<TituloSequelizeModel>({
      where: {
        email: pEmail,
        identificacao: pPagador,
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

  public async editar(pUnitOfWork: UnitOfWork, pTitulo: Titulo): Promise<boolean> {
    const result = await db.models.titulo.update<TituloSequelizeModel>(pTitulo.gerarObjAtualizar(), {
      where: {
        idTitulo: pTitulo.idTitulo,
        email: pTitulo.email,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result.length > 0);
  }
}
