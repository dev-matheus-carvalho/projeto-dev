import UnitOfWork from '../../../entity/UnitOfWork';
import { Pagador } from '../../../entity/objectValues/Pagador';
import IPagadorRepository from '../../../../protocols/repository/pagadorRepository';
import { CriarPagadorInput } from './CriarPagadorInput';
import { CriarPagadorOutput } from './CriarPagadorOutput';

export class CriarPagador {
  constructor(private pagadorRepository: IPagadorRepository) {
  }

  public async execute(pUnitOfWork: UnitOfWork, pInputPagador: CriarPagadorInput): Promise<CriarPagadorOutput | boolean> {
    
    const pagador = new Pagador({
      nome: pInputPagador.nome,
      identificacao: pInputPagador.identificacao
    })

    const isContaExist = await this.pagadorRepository.listarPagadorPorIdentificacao(pagador.identificacao);
    if (!isContaExist) {
      const contaDb = await this.pagadorRepository.criar(pUnitOfWork, pagador)
      return new CriarPagadorOutput(contaDb);
    }
    return false;
  }
}