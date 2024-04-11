import { ValidadorDados } from '@decisaosistemas/typescript-validador-dados';
import InformacaoNaoInfomada from '../../../entity/errors/InformacaoNaoInformada';
import EntrypointData from '../../../entity/entryPoint/EntryPointData';

export class LoginInput {
  public email: string;
  public senha: string;

  constructor(pData: EntrypointData) {
    const emailValidador = ValidadorDados.iniciar(pData.body?.email, 'body.email').obrigatorio().string();
    const senhaValidador = ValidadorDados.iniciar(pData.body?.senha, 'body.senha').obrigatorio().string();
    
    if (emailValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "email": ${emailValidador.getErro()}`);
    }
    if (senhaValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "senha": ${senhaValidador.getErro()}`);
    }

    this.email = pData.body.email;
    this.senha = pData.body.senha;
  }
}