import { ValidadorDados } from '@decisaosistemas/typescript-validador-dados';
import EntrypointData from '../../../entity/entryPoint/EntryPointData';
import InformacaoNaoInfomada from '../../../entity/errors/InformacaoNaoInformada';

export class ReceberPagamentoInput {

  public dataEvento: string;
  public dataCredito: string;
  public valorPrincipal: number;
  public valorMulta: number;
  public valorJuros: number;
  public desconto: number;
  public tipoPagamento: string;
  public idTitulo: string;
  public idConta: string;

  constructor(pData: EntrypointData) {
    const dataEventoValidador = ValidadorDados.iniciar(pData.body?.dataEvento, 'body.dataEvento').obrigatorio().string();
    const dataCreditoValidador = ValidadorDados.iniciar(pData.body?.dataCredito, 'body.dataCredito').obrigatorio().string();
    const valorPrincipalValidador = ValidadorDados.iniciar(pData.body?.valorPrincipal, 'body.valorPrincipal').obrigatorio().number();
    const valorMultaValidador = ValidadorDados.iniciar(pData.body?.valorMulta, 'body.valorMulta').obrigatorio().number();
    const valorJurosValidador = ValidadorDados.iniciar(pData.body?.valorJuros, 'body.valorJuros').obrigatorio().number();
    const descontoValidador = ValidadorDados.iniciar(pData.body?.desconto, 'body.desconto').obrigatorio().number();
    const tipoPagamentoValidador = ValidadorDados.iniciar(pData.body?.tipoPagamento, 'body.tipoPagamento').obrigatorio().string();
    const idTituloValidador = ValidadorDados.iniciar(pData.body?.idTitulo, 'body.idTitulo').obrigatorio().string();
    const idContaValidador = ValidadorDados.iniciar(pData.body?.idConta, 'body.idConta').obrigatorio().string();
  
    if (dataEventoValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "dataEvento": ${dataEventoValidador.getErro()}`);
    }
    if (dataCreditoValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "dataCredito": ${dataCreditoValidador.getErro()}`);
    }
    if (valorPrincipalValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "valorPrincipal": ${valorPrincipalValidador.getErro()}`);
    }
    if (valorMultaValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "valorMulta": ${valorMultaValidador.getErro()}`);
    }
    if (valorJurosValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "valorJuros": ${valorJurosValidador.getErro()}`);
    }
    if (descontoValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "desconto": ${descontoValidador.getErro()}`);
    }
    if (tipoPagamentoValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "tipoPagamento": ${tipoPagamentoValidador.getErro()}`);
    }
    if (idTituloValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "idTitulo": ${idTituloValidador.getErro()}`);
    }
    if (idContaValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "idConta": ${idContaValidador.getErro()}`);
    }

    this.dataEvento = pData.body.dataEvento;
    this.dataCredito = pData.body.dataCredito;
    this.valorPrincipal = Number(pData.body.valorPrincipal);
    this.valorMulta = Number(pData.body.valorMulta);
    this.valorJuros = Number(pData.body.valorJuros);
    this.desconto = Number(pData.body.desconto);
    this.tipoPagamento = pData.body.tipoPagamento;
    this.idTitulo = pData.body.idTitulo;
    this.idConta = pData.body.idConta;
  }
}