import EntrypointData from '../../domain/implementations/entity/entryPoint/EntryPointData';
import ErrorHandler from '../../domain/implementations/entity/errors/ErrorHandler';
import ErroInternoServidor from '../../domain/implementations/entity/errors/ErrorInternoServidor';
import { IEntrypointGuard } from '../../domain/protocols/services/EntrypointGuard';
import { ITokenService } from '../../domain/protocols/services/token.service';
import NaoAutenticado from '../../domain/implementations/entity/errors/NaoAutenticado';

export default class AutenticadoGuard implements IEntrypointGuard {
  constructor(private tokenService: ITokenService) {}

  public async execute(pData: EntrypointData): Promise<{ sucesso: boolean; erro: ErrorHandler | null }> {
    try {
      const isValid = this.tokenService.validar(pData.tokenAuthorization);
      if (isValid === false) {
        return { sucesso: false, erro: new NaoAutenticado('Usuário não logado no sistema ou login está inválido.') };
      }
      return { sucesso: true, erro: null };
    } catch (error) {
      return { sucesso: false, erro: new ErroInternoServidor(error) };
    }
  }
}
