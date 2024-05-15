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
import { verificarVencimento } from '../../../services/verificarVencimento';
import AcaoInvalida from '../../../entity/errors/AcaoInvalida';
import { SituacaoTituloEnum } from '../../../constants/enum/situacaoTituloEnum';


export class CancelarPagamento {
  constructor(
    private tituloRepository: ITituloRepository, 
    private contaRepository: IContaRepository,
    private movimentacaoRepository: IMovimentacaoRepository,
    private lancamentoRepository: ILancamentoRepository,
  ) {
  }
  public async execute(pUnitOfWork: UnitOfWork, pInputLancamento: CancelarPagamentoInput): Promise<boolean> {
    
    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pInputLancamento.idConta);
    if(!!isUsuarioExist === false) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    const isTituloExist = await this.tituloRepository.verificarSeExisteTitulo(pUnitOfWork, pInputLancamento.idTitulo, pInputLancamento.idConta);
    if(!!isTituloExist === false) {
      throw new InformacaoNaoEncontrada('Título não encontrado');
    }
    
    const isMovimentacaoExist = await this.movimentacaoRepository.buscarMovimentacao(pUnitOfWork, pInputLancamento.idTitulo, pInputLancamento.idConta);
    if(!!isMovimentacaoExist === false) {
      throw new InformacaoNaoEncontrada('Movimentação não encontrada');
    }

    const isLancamentoExist = await this.lancamentoRepository.verificarSeLancamentoExiste(pUnitOfWork, pInputLancamento.idLancamento);
    if(!!isLancamentoExist === false) {
      throw new InformacaoNaoEncontrada('Lançamento não encontrado');
    }

    if(!!isLancamentoExist.ativo === false) {
      throw new AcaoInvalida('Lançamento já foi cancelado');
    }

    // isMovimentacaoExist.saldo = isMovimentacaoExist.saldo + isLancamentoExist.valorPrincipal;
    // isMovimentacaoExist.valorTotalDesconto = isMovimentacaoExist.valorTotalDesconto + isLancamentoExist.desconto;

    const situacaoTitulo = verificarVencimento(isTituloExist.vencimento);
    isTituloExist.situacaoTitulo = situacaoTitulo;

    await this.tituloRepository.setarSituacaoDeVencimentoDoTitulo(pUnitOfWork, isTituloExist.idTitulo, isTituloExist.situacaoTitulo, pInputLancamento.idConta);
    await this.lancamentoRepository.setarOEstadoDoLancamentoParaInativo(pUnitOfWork, pInputLancamento.idLancamento, pInputLancamento.idTitulo, pInputLancamento.idConta);
    await this.movimentacaoRepository.cancelarPagamento(pUnitOfWork, isMovimentacaoExist, isLancamentoExist);

    return Promise.resolve(true);
  }
}
