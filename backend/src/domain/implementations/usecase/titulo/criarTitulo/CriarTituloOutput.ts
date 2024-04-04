import { Titulo } from '../../../entity/objectValues/Titulo';

export class CriarPagadorOutput {
  public numeroTitulo: string;
  public tipoTitulo: string;
  public vencimento: Date;
  public situaçaoTitulo: string;
  public duplicataChaveNota: string;
  public duplicataProtocoloNota: string;
  public duplicataNumeroNota: string;
  public duplicataSerieNota: string;
  public duplicataDataEmissao: Date;
  public duplicataNumeroFatura: string;
  public duplicataValorLiquidoFatura: number;
  public valorDoTitulo: number;
  public chequeCmc7: string;
  public email: string;
  public identificacao: string;
  public idLote: string;
  public idMovimentacao: string;
  public idLancamento: string;
  public isProcessado: boolean;
  
  constructor(pTitulo: Titulo) {
    this.numeroTitulo = pTitulo.numeroTitulo,
    this.tipoTitulo = pTitulo.tipoTitulo,
    this.vencimento = pTitulo.vencimento,
    this.situaçaoTitulo = pTitulo.situaçaoTitulo,
    this.duplicataChaveNota = pTitulo.duplicataChaveNota,
    this.duplicataProtocoloNota = pTitulo.duplicataProtocoloNota,
    this.duplicataNumeroNota = pTitulo.duplicataNumeroNota,
    this.duplicataSerieNota = pTitulo.duplicataSerieNota,
    this.duplicataDataEmissao = pTitulo.duplicataDataEmissao,
    this.duplicataNumeroFatura = pTitulo.duplicataNumeroFatura,
    this.duplicataValorLiquidoFatura = pTitulo.duplicataValorLiquidoFatura,
    this.valorDoTitulo = pTitulo.valorDoTitulo,
    this.chequeCmc7 = pTitulo.chequeCmc7,
    this.email = pTitulo.email,
    this.identificacao = pTitulo.identificacao,
    this.idLote = pTitulo.idLote,
    this.idMovimentacao = pTitulo.idMovimentacao,
    this.idLancamento = pTitulo.idLancamento,
    this.isProcessado = pTitulo.isProcessado
  }
}
