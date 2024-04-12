import { ILote, ILoteModel, ILoteModelCreate } from '../../../protocols/models/entity/objectValues/lote';
import { SituacaoLoteEnum } from '../../constants/enum/situacaoLoteEnum';

export class Lote implements ILote {

  public idLote: string = '';
  public situacao: string = SituacaoLoteEnum.NAOENVIADO;
  public dataLote: Date = new Date();
  public dataEnvio?: Date;
  public valorTotalTitulo: number = 0;
  public qtdTitulos: number = 0;
  public idConta: string = '';
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(pValores?: ILoteModel) {
    if (pValores === undefined) return;

    this.idLote = pValores.idLote ?? this.idLote;
    this.situacao = pValores.situacao ?? this.situacao;
    this.dataLote = pValores.dataLote ?? this.dataLote;
    this.dataEnvio = pValores.dataEnvio ?? this.dataEnvio;
    this.valorTotalTitulo = pValores.valorTotalTitulo ?? this.valorTotalTitulo;
    this.qtdTitulos = pValores.qtdTitulos ?? this.qtdTitulos;
    this.idConta = pValores.idConta ?? this.idConta;
    this.createdAt = pValores.createdAt ?? this.createdAt;
    this.updatedAt = pValores.updatedAt ?? this.updatedAt;


  }

  public gerarObjCriar(): ILoteModelCreate {
    return {
      idLote: this.idLote,
      situacao: this.situacao,
      dataLote: this.dataLote,
      dataEnvio: this.dataEnvio,
      valorTotalTitulo: this.valorTotalTitulo,
      qtdTitulos: this.qtdTitulos,
      idConta: this.idConta,
    };
  }
}
