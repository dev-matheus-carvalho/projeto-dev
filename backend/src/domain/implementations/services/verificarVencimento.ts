export function verificarVencimento(dataVencimento: Date): string {
  const data = new Date();
  const hoje = data.setHours(0, 0, 0, 0);
  if(hoje < dataVencimento.getTime() || hoje === dataVencimento.getTime()) {
    return 'AVENCER';
  } else {
    return 'VENCIDO';
  }
}