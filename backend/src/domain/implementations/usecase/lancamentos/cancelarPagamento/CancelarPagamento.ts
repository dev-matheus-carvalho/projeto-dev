import UnitOfWork from '../../../entity/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import IMovimentacaoRepository from '../../../../protocols/repository/movimentacaoRepository';
import ILancamentoRepository from '../../../../protocols/repository/lancamentoRepository';
import { Titulo } from '../../../entity/objectValues/Titulo';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import { Lancamento } from '../../../entity/objectValues/Lancamento';
import { CancelarPagamentoInput } from './CancelarPagamentoInput';
import { Movimentacao } from '../../../entity/objectValues/Movimentacao';


export class CancelarPagamento {
  constructor(
    private tituloRepository: ITituloRepository, 
    private contaRepository: IContaRepository,
    private movimentacaoRepository: IMovimentacaoRepository,
    private lancamentoRepository: ILancamentoRepository,
  ) {
  }
  public async execute(pUnitOfWork: UnitOfWork, pInputLancamento: CancelarPagamentoInput): Promise<any> {

    const titulo: Titulo = new Titulo({
      idTitulo: pInputLancamento.idTitulo,
      idConta: pInputLancamento.idConta,
    });

    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pInputLancamento.idConta);
    const isTituloExist = await this.tituloRepository.verificarSeExisteTitulo(pUnitOfWork, titulo);
    const isLancamentoExist = await this.lancamentoRepository.verificarSeLancamentoExiste(pUnitOfWork, pInputLancamento.idLancamento);
    const isMovimentacaoExist = await this.movimentacaoRepository.buscarMovimentacao(pUnitOfWork, pInputLancamento.idTitulo, pInputLancamento.idConta);
    
    if(!isUsuarioExist) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    if(!isTituloExist) {
      throw new InformacaoNaoEncontrada('Título não encontrado');
    }
    
    if(!isMovimentacaoExist) {
      throw new InformacaoNaoEncontrada('Movimentação não encontrada');
    }

    if(!isLancamentoExist) {
      throw new InformacaoNaoEncontrada('Lançamento não encontrado');
    }

    const movimentacao: Movimentacao = new Movimentacao({
      idMovimentacao: isMovimentacaoExist.idMovimentacao,
      saldo: isMovimentacaoExist.saldo + isLancamentoExist.valorPrincipal,
      valorTotalPrincipal: isMovimentacaoExist.valorTotalPrincipal,
      valorTotalMulta: isMovimentacaoExist.valorTotalMulta + isLancamentoExist.valorMulta,
      valorTotalJuros: isMovimentacaoExist.valorTotalJuros + isLancamentoExist.valorJuros,
      valorTotalDesconto: isMovimentacaoExist.valorTotalDesconto + isLancamentoExist.desconto,
      idTitulo: pInputLancamento.idTitulo,
      idConta: pInputLancamento.idConta,
    });

    await this.lancamentoRepository.editarLancamento(pUnitOfWork, pInputLancamento.idLancamento, pInputLancamento.idTitulo, pInputLancamento.idConta);
    await this.movimentacaoRepository.editar(pUnitOfWork, movimentacao);

    return Promise.resolve(true);
  }
}
