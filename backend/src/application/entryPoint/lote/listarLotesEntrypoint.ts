import IController from '../../../domain/protocols/services/Controller';
import { HttpMetodos } from '../../../infra/express/models/httpMetodoEnum';
import { IEntrypointGuard } from '../../../domain/protocols/services/EntrypointGuard';

export default class ListarLotesEntrypoint {
  public path: string = '/listar-lotes';

  public httpMetodo: HttpMetodos = HttpMetodos.get;

  public guards: IEntrypointGuard[];

  public controller: IController;

  constructor(pController: IController, pGuards: IEntrypointGuard[]) {
    this.guards = pGuards;
    this.controller = pController;
  }
}
