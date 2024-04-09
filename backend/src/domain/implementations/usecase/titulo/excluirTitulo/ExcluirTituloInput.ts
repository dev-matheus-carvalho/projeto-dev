import { ValidadorDados } from '@decisaosistemas/typescript-validador-dados';
import EntrypointData from '../../../entity/entryPoint/EntryPointData';
import InformacaoNaoInfomada from '../../../entity/errors/InformacaoNaoInformada';

export class ExcluirTituloInput {

  public idTitulo: string;
  public email: string;

  constructor(pData: EntrypointData) {
    const idTituloValidador = ValidadorDados.iniciar(pData.body?.idTitulo, 'body.idTitulo').obrigatorio().string();
    const emailValidador = ValidadorDados.iniciar(pData.body?.email, 'body.email').obrigatorio().string();
  
    if (idTituloValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "idTitulo": ${idTituloValidador.getErro()}`);
    }
    if (emailValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "email": ${emailValidador.getErro()}`);
    }

    this.idTitulo = pData.body.idTitulo;
    this.email = pData.body.email;
  }
}