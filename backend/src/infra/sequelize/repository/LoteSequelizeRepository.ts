import db from '../db';
import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';

import { Titulo } from '../../../domain/implementations/entity/objectValues/Titulo';
import { Lote } from '../../../domain/implementations/entity/objectValues/Lote';
import ITituloRepository from '../../../domain/protocols/repository/tituloRepository';
import ILoteRepository from '../../../domain/protocols/repository/loteRepository';
import TituloSequelizeModel from '../models/TituloSequelizeModel';
import LoteSequelizeModel from '../models/LoteSequelizeModel';

export default class LoteSequelizeRepository implements ILoteRepository {
  public async buscaLotePorId(pIdLote: string): Promise<Lote | null> {
    const loteDb = await db.models.lote.findOne<LoteSequelizeModel>({
      where: {
        idLote: pIdLote,
      }
    });
    if (loteDb) {
      return Promise.resolve(new Lote(loteDb));
    }
    return null;
  }
  
  public async criar(pUnitOfWork: UnitOfWork, pLote: Lote): Promise<Lote> {
    const LoteDb = await db.models.lote.create(pLote.gerarObjCriar(), {
      transaction: pUnitOfWork.getTransition(),
    });

    return new Lote(LoteDb);
  }
}
