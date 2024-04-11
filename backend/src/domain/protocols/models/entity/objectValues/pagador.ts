export interface IPagador {
  idPagador: string;
  nome: string;
  identificacao: string;
  idConta: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPagadorModel extends Partial<IPagador> {}

export interface IPagadorModelCreate extends Partial<IPagadorModel> {}
