import IController from '../../../domain/protocols/services/Controller';
import { HttpMetodos } from '../../../infra/express/models/httpMetodoEnum';

export default class FiltrarLotesEntrypoint {
  public path: string = '/filtrar-lotes';

  public httpMetodo: HttpMetodos = HttpMetodos.get;

  public controller: IController;

  constructor(pController: IController) {
    this.controller = pController;
  }
}
