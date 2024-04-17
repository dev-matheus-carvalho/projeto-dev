export interface Ilancamentos {
  idLancamento: string;
  dataEvento: Date;
  dataCredito: Date;
  valorPrincipal: number;
  valorMulta: number;
  valorJuros: number;
  desconto: number;
  tipoPagamento: string;
  ativo: boolean;
  valorTotal: number;
  idTitulo: string;
  idConta: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IlancamentosModel extends Partial<Ilancamentos> {}

export interface IlancamentosModelCreate extends Partial<IlancamentosModel> {}
