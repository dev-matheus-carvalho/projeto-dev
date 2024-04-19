import IController from '../../../domain/protocols/services/Controller';
import { HttpMetodos } from '../../../infra/express/models/httpMetodoEnum';
import { IEntrypointGuard } from '../../../domain/protocols/services/EntrypointGuard';

export default class ExcluirLoteEntrypoint {
  public path: string = '/excluir-lote';

  public httpMetodo: HttpMetodos = HttpMetodos.delete;

  public guards: IEntrypointGuard[];

  public controller: IController;

  constructor(pController: IController, pGuards: IEntrypointGuard[]) {
    this.guards = pGuards;
    this.controller = pController;
  }
}
