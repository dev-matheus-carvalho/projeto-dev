import IController from '../../../domain/protocols/services/Controller';
import { HttpMetodos } from '../../../infra/express/models/httpMetodoEnum';

export default class ProcessarLoteEntrypoint {
  public path: string = '/processar-lote';

  public httpMetodo: HttpMetodos = HttpMetodos.put;

  public controller: IController;

  constructor(pController: IController) {
    this.controller = pController;
  }
}
