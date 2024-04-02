import EntryPoint from '../../../domain/implementations/entity/entryPoint/EntryPoint';
import IController from '../../../domain/protocols/services/Controller';
import { IEntrypointGuard } from '../../../domain/protocols/services/EntrypointGuard';
import { HttpMetodos } from '../../../infra/express/models/httpMetodoEnum';

export default class CriarPagadorEntrypoint {
  public path: string = '/pagador';

  public httpMetodo: HttpMetodos = HttpMetodos.post;

  public controller: IController;

  constructor(pController: IController) {
    this.controller = pController;
  }
}
