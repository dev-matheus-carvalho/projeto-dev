export interface Ilancamentos {
  idLancamento: string;
  dataEvento: Date;
  dataCredito: Date;
  valorPrincipal: number;
  valorMulta: number;
  valorJuros: number;
  tipoPagamento: string;
  ativo: boolean;
  idTitulo: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IlancamentosModel extends Partial<Ilancamentos> {}

export interface IlancamentosModelCreate extends Partial<IlancamentosModel> {}
