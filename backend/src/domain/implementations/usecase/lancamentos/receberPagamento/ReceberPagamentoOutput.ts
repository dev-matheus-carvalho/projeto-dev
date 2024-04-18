import { Lancamento } from '../../../entity/objectValues/Lancamento';

export class ReceberPagamentoOutput {
  public idLancamento: string;
  public dataEvento: Date;
  public dataCredito: Date;
  public valorPrincipal: number;
  public valorMulta: number;
  public valorJuros: number;
  public desconto: number;
  public tipoPagamento: string;
  public ativo: boolean;
  public valorTotal: number;
  public idTitulo: string;
  public idConta: string;
  
  constructor(pLancamento: Lancamento) {
    this.idLancamento = pLancamento.idLancamento,
    this.dataEvento = pLancamento.dataEvento,
    this.dataCredito = pLancamento.dataCredito,
    this.valorPrincipal = pLancamento.valorPrincipal,
    this.valorMulta = pLancamento.valorMulta,
    this.valorJuros = pLancamento.valorJuros,
    this.desconto = pLancamento.desconto,
    this.tipoPagamento = pLancamento.tipoPagamento,
    this.ativo = pLancamento.ativo,
    this.valorTotal = pLancamento.valorTotal,
    this.idTitulo = pLancamento.idTitulo,
    this.idConta = pLancamento.idConta
  }
}
