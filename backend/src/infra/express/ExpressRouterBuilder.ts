import { Router } from 'express';
import { HttpMetodos } from './models/httpMetodoEnum';
import ExpressAdapter from './ExpressAdapter';
import EntryPoint from '../../domain/implementations/entity/entryPoint/EntryPoint';
import ErroInterno from '../../domain/implementations/entity/errors/ErrorInterno';

export default class ExpressRouterBuilder {
    public build(pEntryPoint: EntryPoint): Router {
        const route = Router();
        route[this.convertHttpMethod(pEntryPoint.httpMetodo)](pEntryPoint.path, ExpressAdapter.handler(pEntryPoint));
        return route;
    }

    private convertHttpMethod(pHttpMetod: HttpMetodos): 'get' | 'post' | 'put' | 'patch' | 'delete' {
        switch (pHttpMetod) {
            case HttpMetodos.get:
                return 'get';
            case HttpMetodos.post:
                return 'post';
            case HttpMetodos.patch:
                return 'patch';
            case HttpMetodos.put:
                return 'put';
            case HttpMetodos.delete:
                return 'delete';
            default:
                throw new ErroInterno(`O express não da suporte ao metodo http ${pHttpMetod}`);
        }
    }
}
