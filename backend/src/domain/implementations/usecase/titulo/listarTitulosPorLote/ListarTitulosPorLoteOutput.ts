import { Titulo } from '../../../entity/objectValues/Titulo';

export class ListarTitulosOutput {
  public idTitulo: string;
  public numeroTitulo: string;
  public tipoTitulo: string;
  public vencimento: Date;
  public situacaoTitulo: string;
  public duplicataChaveNota: string;
  public duplicataProtocoloNota: string;
  public duplicataNumeroNota: string;
  public duplicataSerieNota: string;
  public duplicataDataEmissao: Date;
  public duplicataNumeroFatura: string;
  public duplicataValorLiquidoFatura: number;
  public valorDoTitulo: number;
  public chequeCmc7: string;
  public idConta: string;
  public idPagador: string;
  public idLote?: string;
  public isProcessado: boolean;
  
  constructor(pTitulo: Titulo) {
    this.idTitulo = pTitulo.idTitulo,
    this.numeroTitulo = pTitulo.numeroTitulo,
    this.tipoTitulo = pTitulo.tipoTitulo,
    this.vencimento = pTitulo.vencimento,
    this.situacaoTitulo = pTitulo.situacaoTitulo,
    this.duplicataChaveNota = pTitulo.duplicataChaveNota,
    this.duplicataProtocoloNota = pTitulo.duplicataProtocoloNota,
    this.duplicataNumeroNota = pTitulo.duplicataNumeroNota,
    this.duplicataSerieNota = pTitulo.duplicataSerieNota,
    this.duplicataDataEmissao = pTitulo.duplicataDataEmissao,
    this.duplicataNumeroFatura = pTitulo.duplicataNumeroFatura,
    this.duplicataValorLiquidoFatura = pTitulo.duplicataValorLiquidoFatura,
    this.valorDoTitulo = pTitulo.valorDoTitulo,
    this.chequeCmc7 = pTitulo.chequeCmc7,
    this.idConta = pTitulo.idConta,
    this.idPagador = pTitulo.idPagador,
    this.idLote = pTitulo.idLote,
    this.isProcessado = pTitulo.isProcessado
  }
}
