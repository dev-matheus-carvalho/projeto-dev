import { ValidadorDados } from '@decisaosistemas/typescript-validador-dados';
import EntrypointData from '../../../entity/entryPoint/EntryPointData';
import InformacaoNaoInfomada from '../../../entity/errors/InformacaoNaoInformada';


export class CriarPagadorInput {

  public nome: string;
  public identificacao: string;
  public idConta: string;

  // jakch

  constructor(pData: EntrypointData) {

    const nomeValidador = ValidadorDados.iniciar(pData.body?.nome, 'body.nome').obrigatorio().string();
    const identificacaoValidador = ValidadorDados.iniciar(pData.body?.identificacao, 'body.identificacao').obrigatorio().string();
    const idContaValidador = ValidadorDados.iniciar(pData.body?.idConta, 'body.idConta').obrigatorio().string();

    if (nomeValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "nome": ${nomeValidador.getErro()}`);
    }
    
    if (identificacaoValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "identificacao": ${identificacaoValidador.getErro()}`);
    }
    if (idContaValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "idConta": ${idContaValidador.getErro()}`);
    }

    this.nome = pData.body.nome;
    this.identificacao = pData.body.identificacao;
    this.idConta = pData.body.idConta;
  }
}