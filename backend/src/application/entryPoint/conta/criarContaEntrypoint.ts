import EntryPoint from '../../../domain/implementations/entity/entryPoint/EntryPoint';
import IController from '../../../domain/protocols/services/Controller';
import { IEntrypointGuard } from '../../../domain/protocols/services/EntrypointGuard';
import { HttpMetodos } from '../../../infra/express/models/httpMetodoEnum';

export default class CriarContaEntrypoint {
  public path: string = '/conta';

  public httpMetodo: HttpMetodos = HttpMetodos.post;

  // public guards: IEntrypointGuard[];

  public controller: IController;

  constructor(pController: IController) {
    // this.guards = pGuards;
    this.controller = pController;
  }
}
