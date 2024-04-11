import { IConta, IContaModel, IContaModelCreate } from '../../../protocols/models/entity/objectValues/conta';
export class Conta implements IConta {

  public idConta: string = '';
  public nome: string = '';
  public email: string = '';
  public senha: string = '';
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(pValores?: IContaModel) {
    if (pValores === undefined) return;

    this.idConta = pValores.idConta ?? this.idConta;
    this.nome = pValores.nome ?? this.nome;
    this.email = pValores.email ?? this.email;
    this.senha = pValores.senha ?? this.senha;
    this.createdAt = pValores.createdAt ?? this.createdAt;
    this.updatedAt = pValores.updatedAt ?? this.updatedAt;
  }

  public gerarObjCriar(): IContaModelCreate {
    return {
      idConta: this.idConta,
      nome: this.nome,
      email: this.email,
      senha: this.senha,
    };
  }
}
