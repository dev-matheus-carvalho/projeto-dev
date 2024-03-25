import { ErrorCodeEnum } from '../../../protocols/Enum/ErrorCodeEnum';
import ErrorHandler from './ErrorHandler';

export default class RequisicaoMalFormada extends ErrorHandler {
    constructor(pMensagem: string) {
        super(pMensagem, ErrorCodeEnum.requisicaoMalFormada, 400);
    }
}
