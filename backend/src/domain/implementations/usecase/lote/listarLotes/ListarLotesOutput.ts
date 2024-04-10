import { Lote } from '../../../entity/objectValues/Lote';

export class ListarLotesOutput {
  public idLote: string;
  public situacao: string;
  public dataLote: Date;
  public dataEnvio?: Date;
  public valorTotalTitulo: number;
  public qtdTitulos: number;
  public email: string;
  
  constructor(pTitulo: Lote) {
    this.idLote = pTitulo.idLote,
    this.situacao = pTitulo.situacao,
    this.dataLote = pTitulo.dataLote,
    this.dataEnvio = pTitulo.dataEnvio,
    this.valorTotalTitulo = pTitulo.valorTotalTitulo,
    this.qtdTitulos = pTitulo.qtdTitulos,
    this.email = pTitulo.email
  }
}
