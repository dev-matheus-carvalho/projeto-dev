export function FormatarData(pData: string): Date {
  const dataString = pData;
  const dividirData = dataString.split('/');
  const dia = parseInt(dividirData[0], 10);
  const mes = parseInt(dividirData[1], 10) - 1;
  const ano = parseInt(dividirData[2], 10);
  return new Date(ano, mes, dia);
}