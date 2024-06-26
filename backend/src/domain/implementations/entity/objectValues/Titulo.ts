import { ITitulo, ITituloModel, ITituloModelCreate } from '../../../protocols/models/entity/objectValues/titulo';
import { SituacaoTituloEnum } from '../../constants/enum/situacaoTituloEnum';
import { TipoTituloEnum } from '../../constants/enum/tipoTituloEnum';

interface ITituloModelUpdate {
  idTitulo: string,
  numeroTitulo: string;
  tipoTitulo: string;
  vencimento: Date;
  situacaoTitulo?: string;
  duplicataChaveNota?: string;
  duplicataProtocoloNota?: string;
  duplicataNumeroNota?: string;
  duplicataSerieNota?: string;
  duplicataNumeroFatura?: string;
  duplicataValorLiquidoFatura?: number;
  valorDoTitulo: number;
  chequeCmc7?: string;
  idConta: string;
  idPagador: string;
  idLote?: string;
  isProcessado: boolean;
}

export class Titulo implements ITitulo {

  public idTitulo: string = '';
  public numeroTitulo: string = '';
  public tipoTitulo: string = TipoTituloEnum.DUPLICATA;
  public vencimento!: Date;
  public situacaoTitulo: string = SituacaoTituloEnum.AVENCER;
  public duplicataChaveNota: string = '';
  public duplicataProtocoloNota: string = '';
  public duplicataNumeroNota: string = '';
  public duplicataSerieNota: string = '';
  public duplicataDataEmissao!: Date;
  public duplicataNumeroFatura: string = '';
  public duplicataValorLiquidoFatura: number = 0;
  public valorDoTitulo: number = 0;
  public chequeCmc7: string = '';
  public idConta: string = '';
  public idPagador: string = '';
  public idLote: string = '';
  public isProcessado: boolean = false;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(pValores?: ITituloModel) {
    if (pValores === undefined) return;

    this.idTitulo = pValores.idTitulo ?? this.idTitulo;
    this.numeroTitulo = pValores.numeroTitulo ?? this.numeroTitulo;
    this.tipoTitulo = pValores.tipoTitulo ?? this.tipoTitulo;
    this.vencimento = pValores.vencimento ?? this.vencimento;
    this.situacaoTitulo = pValores.situacaoTitulo ?? this.situacaoTitulo;
    this.duplicataChaveNota = pValores.duplicataChaveNota ?? this.duplicataChaveNota;
    this.duplicataProtocoloNota = pValores.duplicataProtocoloNota ?? this.duplicataProtocoloNota;
    this.duplicataNumeroNota = pValores.duplicataNumeroNota ?? this.duplicataNumeroNota;
    this.duplicataSerieNota = pValores.duplicataSerieNota ?? this.duplicataSerieNota;
    this.duplicataDataEmissao = pValores.duplicataDataEmissao ?? this.duplicataDataEmissao;
    this.duplicataNumeroFatura = pValores.duplicataNumeroFatura ?? this.duplicataNumeroFatura;
    this.duplicataValorLiquidoFatura = pValores.duplicataValorLiquidoFatura ?? this.duplicataValorLiquidoFatura;
    this.valorDoTitulo = pValores.valorDoTitulo ?? this.valorDoTitulo;
    this.chequeCmc7 = pValores.chequeCmc7 ?? this.chequeCmc7;
    this.idConta = pValores.idConta ?? this.idConta;
    this.idPagador = pValores.idPagador ?? this.idPagador;
    this.idLote = pValores.idLote ?? this.idLote;
    this.isProcessado = pValores.isProcessado ?? this.isProcessado;
    this.createdAt = pValores.createdAt ?? this.createdAt;
    this.updatedAt = pValores.updatedAt ?? this.updatedAt;
  }

  public gerarObjCriar(): ITituloModelCreate {
    return {
      idTitulo: this.idTitulo,
      numeroTitulo: this.numeroTitulo,
      tipoTitulo: this.tipoTitulo,
      vencimento: this.vencimento,
      situacaoTitulo: this.situacaoTitulo,
      duplicataChaveNota: this.duplicataChaveNota,
      duplicataProtocoloNota: this.duplicataProtocoloNota,
      duplicataNumeroNota: this.duplicataNumeroNota,
      duplicataSerieNota: this.duplicataSerieNota,
      duplicataDataEmissao: this.duplicataDataEmissao,
      duplicataNumeroFatura: this.duplicataNumeroFatura,
      duplicataValorLiquidoFatura: this.duplicataValorLiquidoFatura,
      valorDoTitulo: this.valorDoTitulo,
      chequeCmc7: this.chequeCmc7,
      idConta: this.idConta,
      idPagador: this.idPagador,
      idLote: this.idLote,
      isProcessado: this.isProcessado
    };
  }

  public gerarObjAtualizar(): ITituloModelUpdate {
    return {
      idTitulo: this.idTitulo,
      numeroTitulo: this.numeroTitulo,
      tipoTitulo: this.tipoTitulo,
      vencimento: this.vencimento,
      situacaoTitulo: this.situacaoTitulo,
      duplicataChaveNota: this.duplicataChaveNota,
      duplicataProtocoloNota: this.duplicataProtocoloNota,
      duplicataNumeroNota: this.duplicataNumeroNota,
      duplicataSerieNota: this.duplicataSerieNota,
      duplicataNumeroFatura: this.duplicataNumeroFatura,
      duplicataValorLiquidoFatura: this.duplicataValorLiquidoFatura,
      valorDoTitulo: this.valorDoTitulo,
      chequeCmc7: this.chequeCmc7,
      idConta: this.idConta,
      idPagador: this.idPagador,
      idLote: this.idLote,
      isProcessado: this.isProcessado
    };
  }

}
