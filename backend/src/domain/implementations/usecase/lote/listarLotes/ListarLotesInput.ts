import { ValidadorDados } from '@decisaosistemas/typescript-validador-dados';
import EntrypointData from '../../../entity/entryPoint/EntryPointData';
import InformacaoNaoInfomada from '../../../entity/errors/InformacaoNaoInformada';

export class ListarLotesInput {

  public dataInicial?: string;
  public dataFinal?: string;
  public situacao?: string;
  public idConta: string;

  constructor(pData: EntrypointData) {
    const dataInicialValidador = ValidadorDados.iniciar(pData.body?.dataInicial, 'body.dataInicial').string();
    const dataFinalValidador = ValidadorDados.iniciar(pData.body?.dataFinal, 'body.dataFinal').string();
    const situacaoValidador = ValidadorDados.iniciar(pData.body?.situacao, 'body.situacao').string();
    const idContaValidador = ValidadorDados.iniciar(pData.body?.idConta, 'body.idConta').obrigatorio().string();
  
    if (dataInicialValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "dataInicial": ${dataInicialValidador.getErro()}`);
    }
    if (dataFinalValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "dataFinal": ${dataFinalValidador.getErro()}`);
    }
    if (situacaoValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "situacao": ${situacaoValidador.getErro()}`);
    } 
    if (idContaValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "idConta": ${idContaValidador.getErro()}`);
    }

    this.dataInicial = pData.body.dataInicial;
    this.dataFinal = pData.body.dataFinal;
    this.situacao = pData.body.situacao;
    this.idConta = pData.body.idConta;

  }
}