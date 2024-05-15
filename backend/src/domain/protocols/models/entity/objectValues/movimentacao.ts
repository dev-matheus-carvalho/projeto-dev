export interface IMovimentacao {
  idMovimentacao: string;
  saldo: number;
  valorTotalPrincipal: number;
  valorTotalMulta: number;
  valorTotalJuros: number;
  valorTotalDesconto: number;
  dataUltimoRecebimento?: Date;
  idTitulo: string;
  idConta: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMovimentacaoModel extends Partial<IMovimentacao> {}

export interface IMovimentacaoModelCreate extends Partial<IMovimentacaoModel> {}

export interface IMovimentacaoUpdate {
  saldo: number;
  valorTotalMulta: number;
  valorTotalJuros: number;
  valorTotalDesconto: number;
  dataUltimoRecebimento?: Date;
}