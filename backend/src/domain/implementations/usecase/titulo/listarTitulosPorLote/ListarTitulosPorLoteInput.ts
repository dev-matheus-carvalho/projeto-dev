import { ValidadorDados } from '@decisaosistemas/typescript-validador-dados';
import EntrypointData from '../../../entity/entryPoint/EntryPointData';
import InformacaoNaoInfomada from '../../../entity/errors/InformacaoNaoInformada';

export class ListarTitulosPorLoteInput {

  public idConta: string;
  public idLote: string;

  constructor(pData: EntrypointData) {
    const idContaValidador = ValidadorDados.iniciar(pData.body?.idConta, 'body.idConta').obrigatorio().string();
    const idLoteValidador = ValidadorDados.iniciar(pData.body?.idLote, 'body.idLote').obrigatorio().string();
  
    if (idContaValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "idConta": ${idContaValidador.getErro()}`);
    }
    if (idLoteValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "idLote": ${idLoteValidador.getErro()}`);
    }

    this.idConta = pData.body.idConta;
    this.idLote = pData.body.idLote;
  }
}