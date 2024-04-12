import { ValidadorDados } from '@decisaosistemas/typescript-validador-dados';
import EntrypointData from '../../../entity/entryPoint/EntryPointData';
import InformacaoNaoInfomada from '../../../entity/errors/InformacaoNaoInformada';

export class CriarTituloInput {

  public numeroTitulo: string;
  public tipoTitulo: string;
  public vencimento: string;
  public situacaoTitulo?: string;
  public duplicataChaveNota?: string;
  public duplicataProtocoloNota?: string;
  public duplicataNumeroNota?: string;
  public duplicataSerieNota?: string;
  public duplicataNumeroFatura?: string;
  public duplicataValorLiquidoFatura?: number;
  public valorDoTitulo: number;
  public chequeCmc7?: string;
  public idConta: string;
  public idPagador: string;
  public idLote?: string;
  public isProcessado: boolean;

  constructor(pData: EntrypointData) {

    const numeroTituloValidador = ValidadorDados.iniciar(pData.body?.numeroTitulo, 'body.numeroTitulo').obrigatorio().string();
    const tipoTituloValidador = ValidadorDados.iniciar(pData.body?.tipoTitulo, 'body.tipoTitulo').obrigatorio().string();
    const vencimentoValidador = ValidadorDados.iniciar(pData.body?.vencimento, 'body.vencimento').obrigatorio().string();
    const situacaoTituloValidador = ValidadorDados.iniciar(pData.body?.situacaoTitulo, 'body.situacaoTitulo').string();
    const duplicataChaveNotaValidador = ValidadorDados.iniciar(pData.body?.duplicataChaveNotaTitulo, 'body.duplicataChaveNotaTitulo').string();
    const duplicataProtocoloNotaValidador = ValidadorDados.iniciar(pData.body?.duplicataProtocoloNota, 'body.duplicataProtocoloNota').string();
    const duplicataNumeroNotaValidador = ValidadorDados.iniciar(pData.body?.duplicataNumeroNota, 'body.duplicataNumeroNota').string();
    const duplicataSerieNotaValidador = ValidadorDados.iniciar(pData.body?.duplicataSerieNota, 'body.duplicataSerieNota').string();
    const duplicataNumeroFaturaValidador = ValidadorDados.iniciar(pData.body?.duplicataNumeroFatura, 'body.duplicataNumeroFatura').string();
    const duplicataValorLiquidoFaturaValidador = ValidadorDados.iniciar(pData.body?.duplicataValorLiquidoFatura, 'body.duplicataValorLiquidoFatura').number();
    const valorDoTituloValidador = ValidadorDados.iniciar(pData.body?.valorDoTitulo, 'body.valorDoTitulo').number();
    const chequeCmc7Validador = ValidadorDados.iniciar(pData.body?.chequeCmc7, 'body.chequeCmc7').string();
    const idContaValidador = ValidadorDados.iniciar(pData.body?.idConta, 'body.idConta').obrigatorio().string();
    const idPagadorValidador = ValidadorDados.iniciar(pData.body?.idPagador, 'body.idPagador').obrigatorio().string();
    const idLoteValidador = ValidadorDados.iniciar(pData.body?.idLote, 'body.idLote').string();
    const isProcessadoValidador = ValidadorDados.iniciar(pData.body?.isProcessado, 'body.isProcessado').boolean();

    if (numeroTituloValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "numeroTitulo": ${numeroTituloValidador.getErro()}`);
    }
    if (tipoTituloValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "tipoTitulo": ${tipoTituloValidador.getErro()}`);
    }
    if (vencimentoValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "vencimento": ${vencimentoValidador.getErro()}`);
    }
    if (situacaoTituloValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "situacaoTitulo": ${situacaoTituloValidador.getErro()}`);
    }
    if (duplicataChaveNotaValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "duplicataChaveNota": ${duplicataChaveNotaValidador.getErro()}`);
    }
    if (duplicataProtocoloNotaValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "duplicataProtocoloNota": ${duplicataProtocoloNotaValidador.getErro()}`);
    }
    if (duplicataNumeroNotaValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "duplicataNumeroNota": ${duplicataNumeroNotaValidador.getErro()}`);
    }
    if (duplicataSerieNotaValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "duplicataSerieNota": ${duplicataSerieNotaValidador.getErro()}`);
    }
    if (duplicataNumeroFaturaValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "duplicataNumeroFatura": ${duplicataNumeroFaturaValidador.getErro()}`);
    }
    if (duplicataValorLiquidoFaturaValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "duplicataValorLiquidoFatura": ${duplicataValorLiquidoFaturaValidador.getErro()}`);
    }
    if (valorDoTituloValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "valorDoTitulo": ${valorDoTituloValidador.getErro()}`);
    }
    if (chequeCmc7Validador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "chequeCmc7": ${chequeCmc7Validador.getErro()}`);
    }
    if (idContaValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "idConta": ${idContaValidador.getErro()}`);
    } 
    if (idPagadorValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "idPagador": ${idPagadorValidador.getErro()}`);
    }
    if (idLoteValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "idLote": ${idLoteValidador.getErro()}`);
    }
    if (isProcessadoValidador.estaValido() === false) {
      throw new InformacaoNaoInfomada(`O atributo "isProcessado": ${isProcessadoValidador.getErro()}`);
    }

    this.numeroTitulo = pData.body.numeroTitulo;
    this.tipoTitulo = pData.body.tipoTitulo;
    this.vencimento = pData.body.vencimento;
    this.situacaoTitulo = pData.body.situacaoTitulo;
    this.duplicataChaveNota = pData.body.duplicataChaveNota;
    this.duplicataProtocoloNota = pData.body.duplicataProtocoloNota;
    this.duplicataNumeroNota = pData.body.duplicataNumeroNota;
    this.duplicataSerieNota = pData.body.duplicataSerieNota;
    this.duplicataNumeroFatura = pData.body.duplicataNumeroFatura;
    this.duplicataValorLiquidoFatura = pData.body.duplicataValorLiquidoFatura;
    this.valorDoTitulo = pData.body.valorDoTitulo;
    this.chequeCmc7 = pData.body.chequeCmc7;
    this.idConta = pData.body.idConta;
    this.idPagador = pData.body.idPagador;
    this.idLote = pData.body.idLote;
    this.isProcessado = pData.body.isProcessado;
  }
}