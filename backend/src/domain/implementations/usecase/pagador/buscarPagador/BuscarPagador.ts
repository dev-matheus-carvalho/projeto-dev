import { Pagador } from '../../../entity/objectValues/Pagador';
import IPagadorRepository from '../../../../protocols/repository/pagadorRepository';
import { BuscarPagadorInput } from './BuscarPagadorInput';
import { BuscarPagadorOutput } from './BuscarPagadorOutput';

export class BuscarPagador {
  constructor(private pagadorRepository: IPagadorRepository) {
  }

  public async execute(pInputPagador: BuscarPagadorInput): Promise<BuscarPagadorOutput | null> {
    
    const pagador = new Pagador({
      identificacao: pInputPagador.identificacao,
    });

    const isPagadorExist = await this.pagadorRepository.listarPagadorPorIdentificacao(pagador.identificacao);

    if (isPagadorExist) {
      return new BuscarPagadorOutput(isPagadorExist);
    }
    return null;
  }
}