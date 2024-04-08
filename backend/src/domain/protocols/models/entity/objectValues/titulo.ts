export interface ITitulo {
  idTitulo: string,
  numeroTitulo: string;
  tipoTitulo: string;
  vencimento: Date;
  situacaoTitulo?: string;
  duplicataChaveNota?: string;
  duplicataProtocoloNota?: string;
  duplicataNumeroNota?: string;
  duplicataSerieNota?: string;
  duplicataDataEmissao?: Date;
  duplicataNumeroFatura?: string;
  duplicataValorLiquidoFatura?: number;
  valorDoTitulo: number;
  chequeCmc7?: string;
  email: string;
  identificacao: string;
  idLote?: string;
  // idMovimentacao?: string;
  // idLancamento?: string;
  isProcessado: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITituloModel extends Partial<ITitulo> {}

export interface ITituloModelCreate extends Partial<ITituloModel> {}
