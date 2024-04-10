import { ValidadorDados } from '@decisaosistemas/typescript-validador-dados';
import EntrypointData from '../../../entity/entryPoint/EntryPointData';
import InformacaoNaoInfomada from '../../../entity/errors/InformacaoNaoInformada';

export class EditarLoteInput {

  public idLote: string;
  public email: string;

  constructor(pData: EntrypointData) {
    const idLoteValidador = ValidadorDados.iniciar(pData.body?.idLote, 'body.idLote').obrigatorio().string();
    const emailValidador = ValidadorDados.iniciar(pData.body?.email, 'body.email').obrigatorio().string();
  
    if (idLoteValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "idLote": ${idLoteValidador.getErro()}`);
    }
    if (emailValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "email": ${emailValidador.getErro()}`);
    }

    this.idLote = pData.body.idLote;
    this.email = pData.body.email;
  }
}