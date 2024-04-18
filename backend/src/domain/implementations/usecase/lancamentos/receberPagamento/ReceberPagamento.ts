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

    const titulo: Titulo = new Titulo({
      idTitulo: pInputLancamento.idTitulo,
      idConta: pInputLancamento.idConta,
    });

    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pInputLancamento.idConta);
    const isTituloExist = await this.tituloRepository.verificarSeExisteTitulo(pUnitOfWork, titulo);
    const isMovimentacaoExist = await this.movimentacaoRepository.buscarMovimentacao(pUnitOfWork, pInputLancamento.idTitulo, pInputLancamento.idConta);
    
    if(!isMovimentacaoExist) {
      throw new InformacaoNaoEncontrada('Movimentação não encontrada');
    }

    if(!isUsuarioExist) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    if(!isTituloExist) {
      throw new InformacaoNaoEncontrada('Título não encontrado');
    }

    const movimentacao: Movimentacao = new Movimentacao({
      idMovimentacao: isMovimentacaoExist.idMovimentacao,
      saldo: titulo.valorDoTitulo - pInputLancamento.valorPrincipal,
      valorTotalMulta: isMovimentacaoExist.valorTotalMulta + pInputLancamento.valorMulta,
      valorTotalJuros: isMovimentacaoExist.valorTotalJuros + pInputLancamento.valorJuros,
      valorTotalDesconto: isMovimentacaoExist.valorTotalDesconto + pInputLancamento.desconto,
      dataUltimoRecebimento: GerarData(new Date()),
      idTitulo: pInputLancamento.idTitulo,
      idConta: pInputLancamento.idConta,
    });

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
    await this.movimentacaoRepository.editar(pUnitOfWork, movimentacao);
 
    return new ReceberPagamentoOutput(lancamento);
  }
}
