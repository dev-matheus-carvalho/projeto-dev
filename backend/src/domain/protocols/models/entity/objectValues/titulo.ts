export interface ITitulo {
  numeroTitulo: string;
  tipoTitulo: string;
  vencimento: Date;
  situaçaoTitulo?: string;
  duplicataChaveNota?: string;
  duplicataProtocoloNota?: string; // 1
  duplicataNumeroNota?: string;
  duplicataSerieNota?: string;
  duplicataDataEmissao?: Date;
  duplicataNumeroFatura?: string;
  // numeroDoTitulo?: string;
  duplicataValorLiquidoFatura?: number;
  valorDoTitulo: number; // 3
  chequeCmc7?: string;
  email: string;
  identificacao: string; // Referente ao pagador
  idLote?: string; // Referente ao id do lote
  idMovimentacao?: string;
  idLancamento?: string;
  isProcessado: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITituloModel extends Partial<ITitulo> {}

export interface ITituloModelCreate extends Partial<ITituloModel> {}
