import { Conta } from '../../../entity/objectValues/Conta';

export class LoginOutput {
  public nome: string;
  public email: string;
  constructor(pConta: Conta) {
    this.nome = pConta.nome;
    this.email = pConta.email;
  }
}