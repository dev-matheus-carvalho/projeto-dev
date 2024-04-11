import UnitOfWork from '../../../entity/UnitOfWork';
import { Pagador } from '../../../entity/objectValues/Pagador';
import IPagadorRepository from '../../../../protocols/repository/pagadorRepository';
import { CriarPagadorInput } from './CriarPagadorInput';
import { CriarPagadorOutput } from './CriarPagadorOutput';
import InformacaoDuplicada from '../../../entity/errors/InformacaoDuplicada';
import { v4 } from 'uuid';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';

export class CriarPagador {
  constructor(private pagadorRepository: IPagadorRepository, private contaRepository: IContaRepository) {
  }

  public async execute(pUnitOfWork: UnitOfWork, pInputPagador: CriarPagadorInput): Promise<CriarPagadorOutput | null | any> {
    
    const pagador = new Pagador({
      idPagador: v4(),
      nome: pInputPagador.nome,
      identificacao: pInputPagador.identificacao,
      idConta: pInputPagador.idConta
    });

    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pagador.idConta);
    const isPagadorExist = await this.pagadorRepository.verificarSePagadorExiste(pUnitOfWork, pagador);

    if(!isUsuarioExist) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    if(isPagadorExist) {
      throw new InformacaoDuplicada('Pagador já cadastrado');
    }

    await this.pagadorRepository.criar(pUnitOfWork, pagador);
    return new CriarPagadorOutput(pagador);
  }
}