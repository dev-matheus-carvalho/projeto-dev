import ILoteRepository from '../../../../protocols/repository/loteRepository';
import { Lote } from '../../../entity/objectValues/Lote';
import { ListarLotesInput } from './ListarLotesInput';
import { ListarLotesOutput } from './ListarLotesOutput';

export class ListarLotes {
  constructor(private lotesRepository: ILoteRepository) { }

  public async execute(pInputLote: ListarLotesInput): Promise<Array<ListarLotesOutput>> {
    const lotes: Array<Lote> = await this.lotesRepository.listarLotes(pInputLote.email);
    return lotes;
  }
}