import { Lote } from '../../../entity/objectValues/Lote';

export class FiltrarLotesOutput {
  public idLote: string;
  public situacao: string;
  public dataLote: Date;
  public dataEnvio?: Date;
  public valorTotalTitulo: number;
  public qtdTitulos: number;
  public idConta: string;
  
  constructor(pLote: Lote) {
    this.idLote = pLote.idLote,
    this.situacao = pLote.situacao,
    this.dataLote = pLote.dataLote,
    this.dataEnvio = pLote.dataEnvio,
    this.valorTotalTitulo = pLote.valorTotalTitulo,
    this.qtdTitulos = pLote.qtdTitulos,
    this.idConta = pLote.idConta
    
  }
}
