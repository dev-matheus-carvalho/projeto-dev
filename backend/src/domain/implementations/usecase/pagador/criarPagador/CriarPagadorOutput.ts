import { Pagador } from '../../../entity/objectValues/Pagador';

export class CriarPagadorOutput {
  public nome: string;
  public identificacao: string;
  public email: string;
  
  constructor(pConta: Pagador) {
    this.nome = pConta.nome;
    this.identificacao = pConta.identificacao;
    this.email = pConta.email;
  }
}