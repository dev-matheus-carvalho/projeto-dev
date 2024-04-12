import { Pagador } from '../../../entity/objectValues/Pagador';

export class BuscarPagadorOutput {
  public idPagador: string;
  public nome: string;
  public identificacao: string;
  public idConta: string;
  
  constructor(pConta: Pagador) {
    this.idPagador = pConta.idPagador;
    this.nome = pConta.nome;
    this.identificacao = pConta.identificacao;
    this.idConta = pConta.idConta;
  }
}