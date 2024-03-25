import ErrorHandler from '../../implementations/entity/errors/ErrorHandler';
import { IEntrypointData } from '../models/entryPointData';

export interface IEntrypointGuard {
    execute(pData: IEntrypointData, pRequestIp: string): Promise<{ sucesso: boolean; erro: ErrorHandler | null }>;
}
