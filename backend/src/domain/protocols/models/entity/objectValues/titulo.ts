export interface ITitulo {
  numeroTitulo: string;
  tipoTitulo: string;
  vencimento: Date;
  situaçao: string;
  duplicataChaveNota?: string;
  duplicataProtocoloNota?: string; // 1
  duplicataNumeroNota?: string;
  duplicataSerieNota?: string;
  duplicataDataEmissao?: Date;
  duplicataNumeroFatura?: string;
  numeroDoTitulo?: string; // 2
  duplicataValorLiquidoFatura?: number;
  valorDoTitulo: number; // 3
  chequeCmc7?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITituloModel extends Partial<ITitulo> {}

export interface ITituloModelCreate extends Partial<ITituloModel> {}
