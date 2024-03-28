export interface Ilote {
  idLote: string;
  situacao: string;
  dataLote: Date;
  dataEnvio?: Date;
  valorTotalTitulo: number;
  qtdTitulos: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IloteModel extends Partial<Ilote> {}

export interface IloteModelCreate extends Partial<IloteModel> {}
