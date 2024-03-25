import { ErrorCodeEnum } from '../../../protocols/Enum/ErrorCodeEnum';
import ErrorHandler from './ErrorHandler';

export default class NaoAutenticado extends ErrorHandler {
    constructor(pMensagem: string) {
        super(pMensagem, ErrorCodeEnum.naoAutenticado, 401);
    }
}
