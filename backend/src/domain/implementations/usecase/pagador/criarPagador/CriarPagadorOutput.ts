import { Pagador } from '../../../entity/objectValues/Pagador';

export class CriarPagadorOutput {
  public nome: string;
  public identificacao: string;
  
  constructor(pConta: Pagador) {
    this.nome = pConta.nome;
    this.identificacao = pConta.identificacao;
  }
}