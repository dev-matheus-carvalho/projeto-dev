import db from '../db';
import { Op } from 'sequelize';
import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';

import { Titulo } from '../../../domain/implementations/entity/objectValues/Titulo';
import { Lote } from '../../../domain/implementations/entity/objectValues/Lote';
import ITituloRepository from '../../../domain/protocols/repository/tituloRepository';
import ILoteRepository from '../../../domain/protocols/repository/loteRepository';
import TituloSequelizeModel from '../models/TituloSequelizeModel';
import LoteSequelizeModel from '../models/LoteSequelizeModel';

export default class LoteSequelizeRepository implements ILoteRepository {
  public async buscaLotePorId(pUnitOfWork: UnitOfWork, pIdLote: string): Promise<Lote | null> {
    const loteDb = await db.models.lote.findOne<LoteSequelizeModel>({
      where: {
        idLote: pIdLote,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return loteDb ? new Lote(loteDb) : null;
  }
  
  public async criar(pUnitOfWork: UnitOfWork, pLote: Lote): Promise<Lote> {
    const LoteDb = await db.models.lote.create(pLote.gerarObjCriar(), {
      transaction: pUnitOfWork.getTransition(),
    });

    return new Lote(LoteDb);
  }

  public async listarLotes(pUnitOfWork: UnitOfWork, pIdConta: string): Promise<Lote[]> {
    const loteDb = await db.models.lote.findAll<LoteSequelizeModel>({
      where: {
        idConta: pIdConta
      },
      transaction: pUnitOfWork.getTransition(),
    });
     return loteDb.map((lotes) => new Lote(lotes));
  }

  public async editarValorTotalDeTitulosPorLote(pUnitOfWork: UnitOfWork, idLote: string, valor: number, qtd: number): Promise<boolean> {
    const result = await db.models.lote.update<LoteSequelizeModel>({
      qtdTitulos: qtd,
      valorTotalTitulo: valor
    }, {
      where: {
        idLote: idLote
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result.length > 0);
  }

  public async editarLoteParaProcessado(pUnitOfWork: UnitOfWork, pIdLote: string, pIdConta: string, pData: Date): Promise<boolean> {
    const result = await db.models.lote.update<LoteSequelizeModel>({
      situacao: 'PROCESSADO',
      dataEnvio: pData,
    }, {
      where: {
        idLote: pIdLote,
        idConta: pIdConta,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result.length > 0);
  }

  public async filtrarLotes(pUnitOfWork: UnitOfWork, pDataInicial: Date, pDataFinal: Date, pSituacao: string, pIdConta: string): Promise<Lote[]> {
    const loteDb = await db.models.lote.findAll<LoteSequelizeModel>({
      where: {
        dataLote: {
          [Op.gte]: pDataInicial,
          [Op.lte]: pDataFinal,
        },
        situacao: pSituacao,
        idConta: pIdConta
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return loteDb.map((lotes) => new Lote(lotes));
  }

  public async filtrarTodosLotes(pUnitOfWork: UnitOfWork, pDataInicial: Date, pDataFinal: Date, pIdConta: string): Promise<Lote[]> {
    const loteDb = await db.models.lote.findAll<LoteSequelizeModel>({
      where: {
        dataLote: {
          [Op.gte]: pDataInicial,
          [Op.lte]: pDataFinal,
        },
        idConta: pIdConta
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return loteDb.map((lotes) => new Lote(lotes));
  }

  public async ExcluirLote(pUnitOfWork: UnitOfWork, pIdLote: string, pIdConta: string): Promise<boolean> {
    const result = await db.models.lote.destroy<LoteSequelizeModel>({
      where: {
        idLote: pIdLote,
        idConta: pIdConta,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result > 0);
  }
}
