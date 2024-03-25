import { ErrorCodeEnum } from '../../../protocols/Enum/ErrorCodeEnum';
import ErrorHandler from './ErrorHandler';

export default class InformacaoDuplicada extends ErrorHandler {
    constructor(pMensagem: string, pHttpStatusCode: number = 400) {
        super(pMensagem, ErrorCodeEnum.informacaoDuplicada, pHttpStatusCode);
    }
}
