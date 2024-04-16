import { ValidadorDados } from '@decisaosistemas/typescript-validador-dados';
import EntrypointData from '../../../entity/entryPoint/EntryPointData';
import InformacaoNaoInfomada from '../../../entity/errors/InformacaoNaoInformada';

export class ExcluirTituloInput {

  public idTitulo: string;
  public idLote: string;
  public idConta: string;

  constructor(pData: EntrypointData) {
    const idTituloValidador = ValidadorDados.iniciar(pData.body?.idTitulo, 'body.idTitulo').obrigatorio().string();
    const idLoteValidador = ValidadorDados.iniciar(pData.body?.idLote, 'body.idLote').obrigatorio().string();
    const idContaValidador = ValidadorDados.iniciar(pData.body?.idConta, 'body.idConta').obrigatorio().string();
  
    if (idTituloValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "idTitulo": ${idTituloValidador.getErro()}`);
    }
    if (idLoteValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "idLote": ${idLoteValidador.getErro()}`);
    }
    if (idContaValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "idConta": ${idContaValidador.getErro()}`);
    }

    this.idTitulo = pData.body.idTitulo;
    this.idLote = pData.body.idLote;
    this.idConta = pData.body.idConta;
  }
}