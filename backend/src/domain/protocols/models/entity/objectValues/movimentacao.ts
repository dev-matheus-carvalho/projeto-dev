export interface IMovimentacao {
  idMovimentacao: string;
  saldo: number;
  valorTotalPrincipal: number;
  valorTotalMulta: number;
  valorTotalJuros: number;
  valorTotalDesconto: number;
  dataUltimoRecebimento?: Date;
  statusRecebimento: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMovimentacaoModel extends Partial<IMovimentacao> {}

export interface IMovimentacaoModelCreate extends Partial<IMovimentacaoModel> {}