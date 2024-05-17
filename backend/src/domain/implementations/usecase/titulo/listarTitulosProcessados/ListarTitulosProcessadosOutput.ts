import { Movimentacao } from '../../../entity/objectValues/Movimentacao';
import { Pagador } from '../../../entity/objectValues/Pagador';
import { Titulo } from '../../../entity/objectValues/Titulo';

export class ListarTitulosProcessadosOutput {
  public numeroTitulo: string;
  public tipoTitulo: string;
  public vencimento: Date;
  public pagamento?: Date;
  public situacaoTitulo: string;
  public valorDoTitulo: number;
  public idConta: string;
  public pagador?: string;
  
  constructor(pTitulo: Titulo, pPagamento: Date | undefined, pPagador: string | undefined) {
    this.numeroTitulo = pTitulo.numeroTitulo,
    this.tipoTitulo = pTitulo.tipoTitulo,
    this.vencimento = pTitulo.vencimento,
    this.pagamento = pPagamento,
    this.situacaoTitulo = pTitulo.situacaoTitulo,
    this.valorDoTitulo = pTitulo.valorDoTitulo,
    this.idConta = pTitulo.idConta,
    this.pagador = pPagador
  }
}
