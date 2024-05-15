import UnitOfWork from '../../../entity/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { v4 } from 'uuid';
import { FormatarData } from '../../../services/formatarData';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import { ReceberPagamentoInput } from './ReceberPagamentoInput';
import { Titulo } from '../../../entity/objectValues/Titulo';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import { Lancamento } from '../../../entity/objectValues/Lancamento';
import IMovimentacaoRepository from '../../../../protocols/repository/movimentacaoRepository';
import ILancamentoRepository from '../../../../protocols/repository/lancamentoRepository';
import { Movimentacao } from '../../../entity/objectValues/Movimentacao';
import { GerarData } from '../../../services/gerarData';
import { ReceberPagamentoOutput } from './ReceberPagamentoOutput';
import AcaoInvalida from '../../../entity/errors/AcaoInvalida';

export class ReceberPagamento {
  constructor(
    private tituloRepository: ITituloRepository, 
    private contaRepository: IContaRepository,
    private movimentacaoRepository: IMovimentacaoRepository,
    private lancamentoRepository: ILancamentoRepository,
  ) {
  }
  public async execute(pUnitOfWork: UnitOfWork, pInputLancamento: ReceberPagamentoInput): Promise<ReceberPagamentoOutput | null> {

    const dataRecebimento = FormatarData(pInputLancamento.dataEvento);
    const dataCredito = FormatarData(pInputLancamento.dataCredito);
    const valorTotal = pInputLancamento.valorPrincipal + pInputLancamento.valorMulta + pInputLancamento.valorJuros - pInputLancamento.desconto;

    
    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pInputLancamento.idConta);
    
    if(!!isUsuarioExist === false) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    const isMovimentacaoExist = await this.movimentacaoRepository.buscarMovimentacao(pUnitOfWork, pInputLancamento.idTitulo, pInputLancamento.idConta);
    
    if(!!isMovimentacaoExist === false) {
      throw new InformacaoNaoEncontrada('Movimentação não encontrada');
    }

    const isTituloExist = await this.tituloRepository.verificarSeExisteTitulo(pUnitOfWork, pInputLancamento.idTitulo, pInputLancamento.idConta);
    
    if(!!isTituloExist === false) {
      throw new InformacaoNaoEncontrada('Título não encontrado');
    }

    if(isMovimentacaoExist.saldo === 0) {
      throw new AcaoInvalida('Título já quitado');
    }

    const saldo = isMovimentacaoExist.saldo - pInputLancamento.valorPrincipal;

    if(saldo < 0) {
      throw new AcaoInvalida('Valor a receber excede o valor do saldo');
    }

    const lancamento: Lancamento = new Lancamento({
      idLancamento: v4(),
      dataEvento: dataRecebimento,
      dataCredito: dataCredito,
      valorPrincipal: pInputLancamento.valorPrincipal,
      valorMulta: pInputLancamento.valorMulta,
      valorJuros: pInputLancamento.valorJuros,
      desconto: pInputLancamento.desconto,
      tipoPagamento: pInputLancamento.tipoPagamento,
      ativo: true,
      valorTotal: valorTotal,
      idTitulo: pInputLancamento.idTitulo,
      idConta: pInputLancamento.idConta,
    });

    await this.lancamentoRepository.criar(pUnitOfWork, lancamento);
    await this.movimentacaoRepository.editar(pUnitOfWork, isMovimentacaoExist, lancamento);
 
    if(saldo === 0) {
      await this.tituloRepository.setarSituacaoTituloParaQuitado(pUnitOfWork, pInputLancamento.idTitulo, pInputLancamento.idConta);
    }
    
    return new ReceberPagamentoOutput(lancamento);
  }
}
