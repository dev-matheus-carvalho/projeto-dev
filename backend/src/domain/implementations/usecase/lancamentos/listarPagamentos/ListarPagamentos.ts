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
    
    const titulo: Titulo = new Titulo({
      idTitulo: pInputLancamento.idTitulo,
      idConta: pInputLancamento.idConta,
    });

    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pInputLancamento.idConta);
    const isTituloExist = await this.tituloRepository.verificarSeExisteTitulo(pUnitOfWork, titulo);
    
    if(!isUsuarioExist) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    if(!isTituloExist) {
      throw new InformacaoNaoEncontrada('Título não encontrado');
    }

    const lancamentosDb = await this.lancamentoRepository.listarPagamentos(pUnitOfWork, pInputLancamento.idTitulo, pInputLancamento.idConta);
    const lancamentosOrdenados = lancamentosDb.sort((a, b) => new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime());
    let lancamentos: ListarPagamentosOutput[] = [];

    for(let lancamento of lancamentosOrdenados) {
      lancamentos.push(lancamento);
    }

    return lancamentos;
  }
}
