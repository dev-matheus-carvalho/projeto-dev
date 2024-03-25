export interface ISituacao {
  idSituacao: string;
  dataLote: Date;
  dataEnvio: Date;
  valorTotalTitulo: number;
  qtdTitulos: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISituacaoModel extends Partial<ISituacao> {}

export interface ISituacaoModelCreate extends Partial<ISituacaoModel> {}
