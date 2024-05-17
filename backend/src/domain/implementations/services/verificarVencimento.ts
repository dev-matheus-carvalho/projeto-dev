import { SituacaoTituloEnum } from '../constants/enum/situacaoTituloEnum';

export function verificarVencimento(dataVencimento: Date): SituacaoTituloEnum {
  const data = new Date();
  const hoje = data.setHours(0, 0, 0, 0);
  if(hoje < dataVencimento.getTime() || hoje === dataVencimento.getTime()) {
    return SituacaoTituloEnum.AVENCER;
  } else {
    return SituacaoTituloEnum.VENCIDO;
  }
}

export class verificarSituacaoDeVencimentoDoTitulo {
  constructor(private data: Date) {}

  public verificarVencimentoDoTitulo(): SituacaoTituloEnum {
    const dataDeHoje: Date = new Date();
    const setarHorasDaDataDeHoje: number = dataDeHoje.setHours(0, 0, 0, 0);

    if(setarHorasDaDataDeHoje < this.data.getTime()) {
      return SituacaoTituloEnum.AVENCER;
    } else {
      return SituacaoTituloEnum.VENCIDO;
    }
  }
}