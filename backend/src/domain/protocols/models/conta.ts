export interface IConta {
  idUsuario: string;
  nome: string;
  email: string;
  senha: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IContaModel extends Partial<IConta> {}

export interface IContaModelCreate extends Partial<IContaModel> {}
