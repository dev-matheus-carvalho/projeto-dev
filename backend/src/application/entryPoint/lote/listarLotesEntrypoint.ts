import IController from '../../../domain/protocols/services/Controller';
import { HttpMetodos } from '../../../infra/express/models/httpMetodoEnum';

export default class ListarLotesEntrypoint {
  public path: string = '/listar-lotes';

  public httpMetodo: HttpMetodos = HttpMetodos.get;

  public controller: IController;

  constructor(pController: IController) {
    this.controller = pController;
  }
}
