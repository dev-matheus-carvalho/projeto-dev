import { IMovimentacao, IMovimentacaoModel, IMovimentacaoModelCreate, IMovimentacaoUpdate } from '../../../protocols/models/entity/objectValues/movimentacao';
import { GerarData } from '../../services/gerarData';
import { Lancamento } from './Lancamento';

export class Movimentacao implements IMovimentacao {

  public idMovimentacao: string = '';
  public saldo: number = 0;
  public valorTotalPrincipal: number = 0;
  public valorTotalMulta: number = 0;
  public valorTotalJuros: number = 0;
  public valorTotalDesconto: number = 0;
  public dataUltimoRecebimento?: Date;
  public idTitulo: string = '';
  public idConta: string = '';
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(pValores?: IMovimentacaoModel) {
    if (pValores === undefined) return;

    this.idMovimentacao = pValores.idMovimentacao ?? this.idMovimentacao;
    this.saldo = pValores.saldo ?? this.saldo;
    this.valorTotalPrincipal = pValores.valorTotalPrincipal ?? this.valorTotalPrincipal;
    this.valorTotalMulta = pValores.valorTotalMulta ?? this.valorTotalMulta;
    this.valorTotalJuros = pValores.valorTotalJuros ?? this.valorTotalJuros;
    this.dataUltimoRecebimento = pValores.dataUltimoRecebimento ?? this.dataUltimoRecebimento;
    this.idTitulo = pValores.idTitulo ?? this.idTitulo;
    this.idConta = pValores.idConta ?? this.idConta;
    this.createdAt = pValores.createdAt ?? this.createdAt;
    this.updatedAt = pValores.updatedAt ?? this.updatedAt;


  }

  public gerarObjCriar(): IMovimentacaoModelCreate {
    return {
      idMovimentacao: this.idMovimentacao,
      saldo: this.saldo,
      valorTotalPrincipal: this.valorTotalPrincipal,
      valorTotalMulta: this.valorTotalMulta,
      valorTotalJuros: this.valorTotalJuros,
      valorTotalDesconto: this.valorTotalDesconto,
      dataUltimoRecebimento: this.dataUltimoRecebimento,
      idTitulo: this.idTitulo,
      idConta: this.idConta,
    };
  }

  public gerarObjAtualizar(pLancamento: Lancamento): IMovimentacaoUpdate {
    return {
      saldo: this.saldo,
      valorTotalMulta: this.valorTotalMulta,
      valorTotalJuros: this.valorTotalJuros,
      valorTotalDesconto: this.valorTotalDesconto,
      dataUltimoRecebimento: this.dataUltimoRecebimento
    };
  }

  public gerarObjAtualizarRecebimentoDePagamento(pInputLancamento: Lancamento): IMovimentacaoUpdate {
    return {
      saldo: this.saldo - pInputLancamento.valorPrincipal,
      valorTotalMulta: this.valorTotalMulta + pInputLancamento.valorMulta,
      valorTotalJuros: this.valorTotalJuros + pInputLancamento.valorJuros,
      valorTotalDesconto: this.valorTotalDesconto + pInputLancamento.desconto,
      dataUltimoRecebimento: GerarData(new Date())
    };
  }

  public gerarObjAtualizarCancelamentoDePagamento(pInputLancamento: Lancamento): IMovimentacaoUpdate {
    return {
      saldo: this.saldo + pInputLancamento.valorPrincipal,
      valorTotalMulta: this.valorTotalMulta - pInputLancamento.valorMulta,
      valorTotalJuros: this.valorTotalJuros - pInputLancamento.valorJuros,
      valorTotalDesconto: this.valorTotalDesconto - pInputLancamento.desconto,
      dataUltimoRecebimento: GerarData(new Date())
    };
  }
}
