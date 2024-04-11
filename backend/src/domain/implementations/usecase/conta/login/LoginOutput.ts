import { Conta } from '../../../entity/objectValues/Conta';

export class LoginOutput {
  public idConta: string;
  public nome: string;
  public email: string;
  constructor(pConta: Conta) {
    this.idConta = pConta.idConta;
    this.nome = pConta.nome;
    this.email = pConta.email;
  }
}