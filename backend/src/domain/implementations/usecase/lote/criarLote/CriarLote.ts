import { v4 } from 'uuid';
import UnitOfWork from '../../../entity/UnitOfWork';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import { CriarLoteOutput } from './CriarLoteOutput';
import { Lote } from '../../../entity/objectValues/Lote';

export class CriarLote {
  constructor(private loteRepository: ILoteRepository) {
  }

  public async execute(pUnitOfWork: UnitOfWork): Promise<CriarLoteOutput | boolean> {
    const lote = new Lote({
      idLote: v4(),
      situacao: 'NÃO ENVIADO',
      dataLote: new Date(),
    });

    const isLoteExist = await this.loteRepository.buscaLotePorId(pUnitOfWork , lote.idLote);
    if (!isLoteExist) {
      // const contaDb = await this.contaRepository.criar(pUnitOfWork, conta)
      // return new CriarContaOutput(contaDb);
      // const contaDb = await this.loteRepository.criar(pUnitOfWork, lote)
      // return new CriarLote(contaDb);
    }
    return false;
  }
}