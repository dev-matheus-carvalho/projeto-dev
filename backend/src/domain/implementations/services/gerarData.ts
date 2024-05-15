export function GerarData(pData: Date): Date {
  const dia = pData.getDate();
  const mes = pData.getMonth();
  const ano = pData.getFullYear();
  return new Date(ano, mes, dia);
}

export class GerarNovaData {
  constructor() {}

  public zerarHoras(): Date {
    const dataDeHoje = new Date();
    const dia = dataDeHoje.getDate();
    const mes = dataDeHoje.getMonth();
    const ano = dataDeHoje.getFullYear();
    return new Date(ano, mes, dia);
  }
}