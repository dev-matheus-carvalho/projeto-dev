import IController from '../../../domain/protocols/services/Controller';
import { HttpMetodos } from '../../../infra/express/models/httpMetodoEnum';

export default class ExcluirLoteEntrypoint {
  public path: string = '/excluir-lote';

  public httpMetodo: HttpMetodos = HttpMetodos.delete;

  public controller: IController;

  constructor(pController: IController) {
    this.controller = pController;
  }
}
