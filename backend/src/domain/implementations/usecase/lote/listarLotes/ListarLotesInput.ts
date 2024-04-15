import { ValidadorDados } from '@decisaosistemas/typescript-validador-dados';
import EntrypointData from '../../../entity/entryPoint/EntryPointData';
import InformacaoNaoInfomada from '../../../entity/errors/InformacaoNaoInformada';

export class ListarLotesInput {

  public idConta: string;

  constructor(pData: EntrypointData) {
    const idContaValidador = ValidadorDados.iniciar(pData.body?.idConta, 'body.idConta').obrigatorio().string();
  
    if (idContaValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "idConta": ${idContaValidador.getErro()}`);
    }

    this.idConta = pData.body.idConta;

  }
}