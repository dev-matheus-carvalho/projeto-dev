import { Lote } from '../../../entity/objectValues/Lote';

export class CriarLoteOutput {

  public idLote: string;
  public situacao: string;
  public dataLote: Date;
  public dataEnvio?: Date;
  public valorTotalTitulo: number;
  public qtdTitulos: number;
  
  constructor(pLote: Lote) {
    this.idLote = pLote.idLote;
    this.situacao = pLote.situacao;
    this.dataLote = pLote.dataLote;
    this.valorTotalTitulo = pLote.valorTotalTitulo;
    this.qtdTitulos = pLote.qtdTitulos;
  }
}