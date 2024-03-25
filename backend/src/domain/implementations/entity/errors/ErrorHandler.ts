import { ErrorCodeEnum } from '../../../protocols/Enum/ErrorCodeEnum';

export default class ErrorHandler extends Error {
  public mensagem: string;

  public codigoErro: ErrorCodeEnum;

  public httpStatusCode: number = 500;

  constructor(pMensagem: string, pCodigoErro: ErrorCodeEnum, pHttpStatusCode: number) {
    super(pMensagem);
    this.mensagem = pMensagem;
    this.codigoErro = pCodigoErro;
    this.httpStatusCode = pHttpStatusCode;
  }
}
