export interface ILote {
  idLote: string;
  situacao: string;
  dataLote: Date;
  dataEnvio?: Date;
  valorTotalTitulo: number;
  qtdTitulos: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoteModel extends Partial<ILote> {}

export interface ILoteModelCreate extends Partial<ILoteModel> {}
