import UnitOfWork from '../../../entity/UnitOfWork';
import { Pagador } from '../../../entity/objectValues/Pagador';
import IPagadorRepository from '../../../../protocols/repository/pagadorRepository';
import { EditarPagadorInput } from './EditarPagadorInput';

export class CriarPagador {
  constructor(private pagadorRepository: IPagadorRepository) {
  }

  public async execute(pUnitOfWork: UnitOfWork, pInputPagador: EditarPagadorInput): Promise<boolean> {
    
    const pagador = new Pagador({
      nome: pInputPagador.nome,
      identificacao: pInputPagador.identificacao
    })

    const isPagadorExist = await this.pagadorRepository.listarPagadorPorIdentificacao(pagador.identificacao);
    if (isPagadorExist) {
      await this.pagadorRepository.editar(pUnitOfWork, pagador);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}