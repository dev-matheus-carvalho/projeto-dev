import { Ilancamentos } from './lancamentos';

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
  idConta: string;
  idPagador: string;
  idLote: string;
  idMovimentacao?: string;
  idLancamento?: Ilancamentos[];
  isProcessado: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITituloModel extends Partial<ITitulo> {}

export interface ITituloModelCreate extends Partial<ITituloModel> {}
