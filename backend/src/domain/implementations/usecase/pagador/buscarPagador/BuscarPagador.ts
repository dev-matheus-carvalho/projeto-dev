import UnitOfWork from '../../../entity/UnitOfWork';
import { Pagador } from '../../../entity/objectValues/Pagador';
import IPagadorRepository from '../../../../protocols/repository/pagadorRepository';
import { BuscarPagadorInput } from './BuscarPagadorInput';
import { BuscarPagadorOutput } from './BuscarPagadorOutput';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import IContaRepository from '../../../../protocols/repository/contaRepository';

export class BuscarPagador {
  constructor(private pagadorRepository: IPagadorRepository, private contaRepository: IContaRepository) {
  }

  public async execute(pUnitOfWork: UnitOfWork, pInputPagador: BuscarPagadorInput): Promise<BuscarPagadorOutput | null> {
    
    const pagador = new Pagador({
      idPagador: pInputPagador.idPagador,
      idConta: pInputPagador.idConta,
    });

    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pagador.idConta);
    const isPagadorExist = await this.pagadorRepository.verificarSePagadorExiste(pUnitOfWork, pagador);

    if(!isUsuarioExist) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    if(!isPagadorExist) {
      throw new InformacaoNaoEncontrada('Pagador não encontrado');
    }

    return new BuscarPagadorOutput(isPagadorExist);
  }
}