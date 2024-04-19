import { Conta } from '../../../entity/objectValues/Conta';

export class LoginOutput {
  public idConta: string;
  public nome: string;
  public email: string;
  public token: string;
  constructor(pConta: Conta, pToken: string) {
    this.idConta = pConta.idConta;
    this.nome = pConta.nome;
    this.email = pConta.email;
    this.token = pToken;
  }
}