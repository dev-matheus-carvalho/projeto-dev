import { ILote } from './lote';
import { IPagador } from './pagador';
import { ITitulo } from './titulo';

export interface IConta {
  idConta: string;
  nome: string;
  email: string;
  senha: string;
  pagador?: IPagador[];
  titulo?: ITitulo[];
  lote?: ILote[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IContaModel extends Partial<IConta> {}

export interface IContaModelCreate extends Partial<IContaModel> {}
