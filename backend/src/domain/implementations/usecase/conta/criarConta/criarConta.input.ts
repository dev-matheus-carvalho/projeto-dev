import EntrypointData from '../../../entity/entryPoint/EntryPointData';
import RequisicaoMalFormada from '../../../entity/errors/RequisicaoMalFormada';
import { ValidadorDadosUtils } from '../../../utils/validadorDados.utils';

export default class CriarContaInput {
  public nome: string;

  public email: string;

  public senhaCriptografada: string;

  constructor(pRequest: EntrypointData) {
    [
      ValidadorDadosUtils.iniciar(pRequest.body.nome, 'Body.nome').obrigatorio(),
      ValidadorDadosUtils.iniciar(pRequest.body.email, 'Body.email').obrigatorio().email(),
      ValidadorDadosUtils.iniciar(pRequest.body.senhaCriptografada, 'Body.senhaCriptografada').obrigatorio().string(),
    ].forEach((pVal) => {
      if (pVal.estaInvalido()) {
        throw new RequisicaoMalFormada(pVal.getErroCompleto());
      }
    });

    this.nome = pRequest.body.nome;
    this.email = pRequest.body.email;
    this.senhaCriptografada = pRequest.body.senhaCriptografada;
  }
}
