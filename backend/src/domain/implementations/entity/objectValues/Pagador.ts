import { IPagador, IPagadorModel, IPagadorModelCreate } from '../../../protocols/models/entity/objectValues/pagador';
export class Pagador implements IPagador {

  public nome: string = '';
  public identificacao: string = '';
  public email: string = '';
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(pValores?: IPagadorModel) {
    if (pValores === undefined) return;

    this.nome = pValores.nome ?? this.nome;
    this.identificacao = pValores.identificacao ?? this.identificacao;
    this.email = pValores.email ?? this.email;
    this.createdAt = pValores.createdAt ?? this.createdAt;
    this.updatedAt = pValores.updatedAt ?? this.updatedAt;
  }

  public gerarObjCriar(): IPagadorModelCreate {
    return {
      nome: this.nome,
      identificacao: this.identificacao,
      email: this.email,
    };
  }
}
