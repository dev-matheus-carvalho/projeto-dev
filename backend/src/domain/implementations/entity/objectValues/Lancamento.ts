import { Ilancamentos, IlancamentosModel, IlancamentosModelCreate } from '../../../protocols/models/entity/objectValues/lancamentos';

export class Lancamento implements Ilancamentos {

  public idLancamento: string = '';
  public dataEvento: Date = new Date();
  public dataCredito: Date = new Date();
  public valorPrincipal: number = 0;
  public valorMulta: number = 0;
  public valorJuros: number = 0;
  public desconto: number = 0;
  public tipoPagamento: string = '';
  public ativo: boolean = false;
  public valorTotal: number = 0;
  public idTitulo: string = '';
  public idConta: string = '';
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(pValores?: IlancamentosModel) {
    if (pValores === undefined) return;

    this.idLancamento = pValores.idLancamento ?? this.idLancamento;
    this.dataEvento = pValores.dataEvento ?? this.dataEvento;
    this.dataCredito = pValores.dataCredito ?? this.dataCredito;
    this.valorPrincipal = pValores.valorPrincipal ?? this.valorPrincipal;
    this.valorMulta = pValores.valorMulta ?? this.valorMulta;
    this.valorJuros = pValores.valorJuros ?? this.valorJuros;
    this.desconto = pValores.desconto ?? this.desconto;
    this.ativo = pValores.ativo ?? this.ativo;
    this.valorTotal = pValores.valorTotal ?? this.valorTotal;
    this.idTitulo = pValores.idTitulo ?? this.idTitulo;
    this.idConta = pValores.idConta ?? this.idConta;
    this.createdAt = pValores.createdAt ?? this.createdAt;
    this.updatedAt = pValores.updatedAt ?? this.updatedAt;


  }

  public gerarObjCriar(): IlancamentosModelCreate {
    return {
      idLancamento: this.idLancamento,
      dataEvento: this.dataEvento,
      dataCredito: this.dataCredito,
      valorPrincipal: this.valorPrincipal,
      valorMulta: this.valorMulta,
      valorJuros: this.valorJuros,
      desconto: this.desconto,
      tipoPagamento: this.tipoPagamento,
      ativo: this.ativo,
      valorTotal: this.valorTotal,
      idTitulo: this.idTitulo,
      idConta: this.idConta,
    };
  }
}
