import { ValidadorDados } from '@decisaosistemas/typescript-validador-dados';
import EntrypointData from '../../../entity/entryPoint/EntryPointData';
import InformacaoNaoInfomada from '../../../entity/errors/InformacaoNaoInformada';

export class BuscarPagadorInput {

  public idPagador: string;
  public idConta: string;

  constructor(pData: EntrypointData) {

    const idPagadorValidador = ValidadorDados.iniciar(pData.body?.idPagador, 'body.idPagador').obrigatorio().string();
    const idContaValidador = ValidadorDados.iniciar(pData.body?.idConta, 'body.idConta').obrigatorio().string();

    if (idPagadorValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "idPagador": ${idPagadorValidador.getErro()}`);
    }
    if (idContaValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "idConta": ${idContaValidador.getErro()}`);
    }

    this.idPagador = String(pData.body.idPagador);
    this.idConta = String(pData.body.idConta);
  }
}