import { IPagador, IPagadorModel, IPagadorModelCreate } from '../../../protocols/models/entity/objectValues/pagador';
export class Pagador implements IPagador {

  public idPagador: string = '';
  public nome: string = '';
  public identificacao!: string;
  public idConta: string = '';
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(pValores?: IPagadorModel) {
    if (pValores === undefined) return;

    this.idPagador = pValores.idPagador ?? this.idPagador;
    this.nome = pValores.nome ?? this.nome;
    this.identificacao = pValores.identificacao ?? this.identificacao;
    this.idConta = pValores.idConta ?? this.idConta;
    this.createdAt = pValores.createdAt ?? this.createdAt;
    this.updatedAt = pValores.updatedAt ?? this.updatedAt;
  }

  public gerarObjCriar(): IPagadorModelCreate {
    return {
      idPagador: this.idPagador,
      nome: this.nome,
      identificacao: this.identificacao,
      idConta: this.idConta,
    };
  }
}
