import UnitOfWork from '../../../entity/UnitOfWork';
import { Pagador } from '../../../entity/objectValues/Pagador';
import IPagadorRepository from '../../../../protocols/repository/pagadorRepository';
import { EditarPagadorInput } from './EditarPagadorInput';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import { EditarPagadorOutput } from './EditarPagadorOutput';

export class EditarPagador {
  constructor(private pagadorRepository: IPagadorRepository, private contaRepository: IContaRepository) {
  }

  public async execute(pUnitOfWork: UnitOfWork, pInputPagador: EditarPagadorInput): Promise<EditarPagadorOutput | null> {
    
    const pagador = new Pagador({
      idPagador: pInputPagador.idPagador,
      nome: pInputPagador.nome,
      identificacao: pInputPagador.identificacao,
      idConta: pInputPagador.idConta,
    });

    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pInputPagador.idConta);
    const isPagadorExist = await this.pagadorRepository.verificarSePagadorExiste(pUnitOfWork, pInputPagador.idPagador, pInputPagador.identificacao, pInputPagador.idConta);
    
    if(!!isUsuarioExist === false) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    if(!!isPagadorExist === false) {
      throw new InformacaoNaoEncontrada('Pagador não encontrado');
    }

    await this.pagadorRepository.editar(pUnitOfWork, pagador);
    return new EditarPagadorOutput(pagador);
  }
}