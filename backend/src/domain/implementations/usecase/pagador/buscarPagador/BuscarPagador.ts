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
    
    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pInputPagador.idConta);
    
    if(!!isUsuarioExist === false) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }
    
    const isPagadorExist = await this.pagadorRepository.verificarSePagadorExiste(pUnitOfWork, pInputPagador.idPagador, pInputPagador.identificacao, pInputPagador.idConta);
    
    if(!!isPagadorExist === false) {
      throw new InformacaoNaoEncontrada('Pagador não encontrado');
    }

    return new BuscarPagadorOutput(isPagadorExist);
  }
}