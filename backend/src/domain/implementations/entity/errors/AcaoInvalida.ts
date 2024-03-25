import { ErrorCodeEnum } from '../../../protocols/Enum/ErrorCodeEnum';
import ErrorHandler from './ErrorHandler';

export default class AcaoInvalida extends ErrorHandler {
    constructor(pMensagem: string) {
        super(pMensagem, ErrorCodeEnum.acaoNegada, 400);
    }
}
