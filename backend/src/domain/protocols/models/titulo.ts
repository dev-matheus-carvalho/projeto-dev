export interface ITitulo {
  idTitulo: string;
  numeroTitulo: string;
  tipoTitulo: string;
  valorTotalTitulo: number;
  vencimento: Date;
  situaçao: string;
  duplicataChaveNota: string;
  duplicataSerieNota: string;
  duplicataDataEmissao: Date;
  duplicataNumeroFatura: string;
  duplicataNumeroLiquidoFatura: string;
  duplicataValorLiquidoFatura: number;
  chequeCmc7: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITituloModel extends Partial<ITitulo> {}

export interface ITituloModelCreate extends Partial<ITituloModel> {}
