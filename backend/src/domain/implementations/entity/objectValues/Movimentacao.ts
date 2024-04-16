import { ILote, ILoteModel, ILoteModelCreate } from '../../../protocols/models/entity/objectValues/lote';
import { IMovimentacao, IMovimentacaoModel, IMovimentacaoModelCreate } from '../../../protocols/models/entity/objectValues/movimentacao';
import { SituacaoLoteEnum } from '../../constants/enum/situacaoLoteEnum';

export class Movimentacao implements IMovimentacao {

  public idMovimentacao: string = '';
  public saldo: number = 0;
  public valorTotalPrincipal: number = 0;
  public valorTotalMulta: number = 0;
  public valorTotalJuros: number = 0;
  public valorTotalDesconto: number = 0;
  public dataUltimoRecebimento?: Date;
  public statusRecebimento: boolean = false;
  public idTitulo: string = '';
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
    this.statusRecebimento = pValores.statusRecebimento ?? this.statusRecebimento;
    this.idTitulo = pValores.idTitulo ?? this.idTitulo;
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
      statusRecebimento: this.statusRecebimento,
      idTitulo: this.idTitulo,
    };
  }
}
