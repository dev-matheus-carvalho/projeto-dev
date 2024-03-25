import { ErrorCodeEnum } from '../../../protocols/Enum/ErrorCodeEnum';
import ErrorHandler from '../errors/ErrorHandler';

export default class EntryPointResponseError {
  public descricao: string;

  public codigoErro: ErrorCodeEnum;

  constructor(pErro: ErrorHandler) {
    this.descricao = pErro.mensagem;
    this.codigoErro = pErro.codigoErro;
  }
}
