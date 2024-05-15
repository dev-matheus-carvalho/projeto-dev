import db from '../db';
import UnitOfWork from '../../../domain/implementations/entity/UnitOfWork';

import { Titulo } from '../../../domain/implementations/entity/objectValues/Titulo';
import ITituloRepository from '../../../domain/protocols/repository/tituloRepository';
import TituloSequelizeModel from '../models/TituloSequelizeModel';
import { SituacaoTituloEnum } from '../../../domain/implementations/constants/enum/situacaoTituloEnum';

export default class TituloSequelizeRepository implements ITituloRepository {
  
  public async criar(pUnitOfWork: UnitOfWork, pTitulo: Titulo): Promise<Titulo> {
    const tituloDb = await db.models.titulo.create(pTitulo.gerarObjCriar(), {
      transaction: pUnitOfWork.getTransition(),
    });

    return new Titulo(tituloDb);
  }

  public async verificarSeExisteTitulo(pUnitOfWork: UnitOfWork, pIdTitulo: string, pIdConta: string): Promise<Titulo | null> {
    const tituloDb = await db.models.titulo.findOne<TituloSequelizeModel>({
      where: {
        idTitulo: pIdTitulo,
        idConta: pIdConta,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return tituloDb ? new Titulo(tituloDb) : null;
  }

  public async buscarTituloPorIdTitulo(pUnitOfWork: UnitOfWork, pIdTitulo: string): Promise<Titulo | null> {
    const tituloDb = await db.models.titulo.findOne<TituloSequelizeModel>({
      where: {
        numeroTitulo: pIdTitulo,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return tituloDb ? new Titulo(tituloDb) : null;
  }

  public async buscarTituloPorEmailDoTitulo(pEmail: string): Promise<Titulo | null> {
    const tituloDb = await db.models.titulo.findOne<TituloSequelizeModel>({
      where: {
        idConta: pEmail,
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
        idConta: pEmail,
        idPagador: pPagador,
      }
    });
    if (tituloDb) {
      return Promise.resolve(new Titulo(tituloDb));
    }
    return null;
  }

  public async listarTitulosPorLote(pUnitOfWork: UnitOfWork, pIdLote: string, pIdConta: string): Promise<Titulo[]> {
    const tituloDb = await db.models.titulo.findAll<TituloSequelizeModel>({
      where: {
        isProcessado: false,
        idLote: pIdLote,
        idConta: pIdConta
      },
      transaction: pUnitOfWork.getTransition(),
    });
     return tituloDb.map((titulo) => new Titulo(titulo));
  }

  public async listarTitulosProcessados(pUnitOfWork: UnitOfWork, pIdConta: string): Promise<Titulo[]> {
    const tituloDb = await db.models.titulo.findAll<TituloSequelizeModel>({
      where: {
        isProcessado: true,
        idConta: pIdConta
      },
      transaction: pUnitOfWork.getTransition(),
    });
     return tituloDb.map((titulo) => new Titulo(titulo));
  }

  public async editar(pUnitOfWork: UnitOfWork, pTitulo: Titulo): Promise<boolean> {
    const result = await db.models.titulo.update<TituloSequelizeModel>(pTitulo.gerarObjAtualizar(), {
      where: {
        idTitulo: pTitulo.idTitulo,
        idConta: pTitulo.idConta,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result.length > 0);
  }

  public async atualizarVencimento(pUnitOfWork: UnitOfWork, pTitulo: Titulo): Promise<boolean> {
    const result = await db.models.titulo.update<TituloSequelizeModel>({
      situacaoTitulo: pTitulo.situacaoTitulo,
    }, {
      where: {
        idTitulo: pTitulo.idTitulo,
        idConta: pTitulo.idConta,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result.length > 0);
  }

  public async editarSituacaoTitulos(pUnitOfWork: UnitOfWork, pIdLote: string, pIdConta: string): Promise<boolean> {
    const result = await db.models.titulo.update<TituloSequelizeModel>({
      isProcessado: true,
    }, {
      where: {
        idLote: pIdLote,
        idConta: pIdConta
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result.length > 0);
  }

  public async setarSituacaoTituloParaQuitado(pUnitOfWork: UnitOfWork, pIdTitulo: string, pIdConta: string): Promise<boolean> {
    const result = await db.models.titulo.update<TituloSequelizeModel>({
      situacaoTitulo: SituacaoTituloEnum.QUITADO,
    }, {
      where: {
        idTitulo: pIdTitulo,
        idConta: pIdConta,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result.length > 0);
  }

  // Apagar
  public async cancelarPagamento(pUnitOfWork: UnitOfWork, pTitulo: Titulo): Promise<boolean> {
    const result = await db.models.titulo.update<TituloSequelizeModel>({
      situacaoTitulo: pTitulo.situacaoTitulo,
    }, {
      where: {
        idTitulo: pTitulo.idTitulo,
        idConta: pTitulo.idConta
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result.length > 0);
  }

  public async setarSituacaoDeVencimentoDoTitulo(pUnitOfWork: UnitOfWork, pIdTitulo: string, pSituacao: string, pIdConta: string): Promise<boolean> {
    const result = await db.models.titulo.update<TituloSequelizeModel>({
      situacaoTitulo: pSituacao,
    }, {
      where: {
        idTitulo: pIdTitulo,
        idConta: pIdConta
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result.length > 0);
  }

  public async excluir(pUnitOfWork: UnitOfWork, pIdTitulo: string, pIdConta: string): Promise<boolean> {
    const result = await db.models.titulo.destroy<TituloSequelizeModel>({
      where: {
        idTitulo: pIdTitulo,
        idConta: pIdConta,
      },
      transaction: pUnitOfWork.getTransition(),
    });
    return Promise.resolve(result > 0);
  }

  public async excluirTitulosPorLote(pUnitOfWork: UnitOfWork, pIdLote: string, pIdConta: string): Promise<boolean> {
    const result = await db.models.titulo.destroy<TituloSequelizeModel>({
      where: {
        idLote: pIdLote,
        idConta: pIdConta,
      },
      transaction: pUnitOfWork.getTransition(),

    });
    return Promise.resolve(result > 0);
  }
}
