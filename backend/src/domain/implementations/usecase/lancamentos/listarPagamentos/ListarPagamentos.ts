import UnitOfWork from '../../../entity/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import IMovimentacaoRepository from '../../../../protocols/repository/movimentacaoRepository';
import ILancamentoRepository from '../../../../protocols/repository/lancamentoRepository';
import { ListarPagamentosInput } from './ListarPagamentosInput';
import { ListarPagamentosOutput } from './ListarPagamentosOutput';
import { Titulo } from '../../../entity/objectValues/Titulo';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import { Lancamento } from '../../../entity/objectValues/Lancamento';


export class ListarPagamentos {
  constructor(
    private tituloRepository: ITituloRepository, 
    private contaRepository: IContaRepository,
    private lancamentoRepository: ILancamentoRepository,
  ) {
  }
  public async execute(pUnitOfWork: UnitOfWork, pInputLancamento: ListarPagamentosInput): Promise<ListarPagamentosOutput[]> {
   
    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pInputLancamento.idConta);
    
    if(!isUsuarioExist) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    const isTituloExist = await this.tituloRepository.verificarSeExisteTitulo(pUnitOfWork, pInputLancamento.idTitulo, pInputLancamento.idConta);
    
    if(!isTituloExist) {
      throw new InformacaoNaoEncontrada('Título não encontrado');
    }

    const lancamentosDb = (await this.lancamentoRepository.listarPagamentos(pUnitOfWork, pInputLancamento.idTitulo, pInputLancamento.idConta));

    return lancamentosDb.map(pLancamento => new ListarPagamentosOutput(pLancamento));
  }
}
