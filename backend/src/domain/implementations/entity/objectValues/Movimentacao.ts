import { IMovimentacao, IMovimentacaoModel, IMovimentacaoModelCreate } from '../../../protocols/models/entity/objectValues/movimentacao';

interface IMovimentacaoModelUpdate {
  idMovimentacao: string;
  saldo: number;
  valorTotalPrincipal: number;
  valorTotalMulta: number;
  valorTotalJuros: number;
  valorTotalDesconto: number;
  dataUltimoRecebimento?: Date;
  idTitulo: string;
  idConta: string;
}




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

  public gerarObjAtualizar(): IMovimentacaoModelUpdate {
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
}
