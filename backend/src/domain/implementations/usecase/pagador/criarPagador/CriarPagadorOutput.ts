import { Pagador } from '../../../entity/objectValues/Pagador';

export class CriarPagadorOutput {
  public nome: string;
  public identificacao: string;
  public idConta: string;
  
  constructor(pPagador: Pagador) {
    this.nome = pPagador.nome;
    this.identificacao = pPagador.identificacao;
    this.idConta = pPagador.idConta;
  }
}