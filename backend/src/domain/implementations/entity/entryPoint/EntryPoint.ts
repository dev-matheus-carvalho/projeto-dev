import { HttpMetodos } from '../../../../infra/express/models/httpMetodoEnum'; 
// import { IEntrypointGuard } from '../entryPoints/EntryPointGuard';
import IController from '../../../protocols/services/Controller';

export default class EntryPoint {
  public path: string = '';

  public httpMetodo: HttpMetodos;

  // public guards: IEntrypointGuard[] = [];

  public controller: IController;

  constructor(pPath: string, pHttpMetodo: HttpMetodos, pController: IController) {
    this.path = pPath;
    this.httpMetodo = pHttpMetodo;
    // this.guards = pGuards;
    this.controller = pController;
  }
}
