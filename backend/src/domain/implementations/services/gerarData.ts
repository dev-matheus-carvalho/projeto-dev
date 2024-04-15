export function GerarData(pData: Date): Date {
  const dia = pData.getDate();
  const mes = pData.getMonth();
  const ano = pData.getFullYear();
  return new Date(ano, mes, dia);
}