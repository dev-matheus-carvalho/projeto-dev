import { HttpMetodos } from '../../../../infra/express/models/httpMetodoEnum';
import IController from '../../../protocols/services/Controller';
import { IEntrypointGuard } from '../../../protocols/services/EntrypointGuard';

export default class EntryPoint {
  public path: string = '';

  public httpMetodo: HttpMetodos;

  public guards: IEntrypointGuard[] = [];

  public controller: IController;

  constructor(pPath: string, pHttpMetodo: HttpMetodos, pGuards: IEntrypointGuard[], pController: IController) {
    this.path = pPath;
    this.httpMetodo = pHttpMetodo;
    this.guards = pGuards;
    this.controller = pController;
  }
}
