import EntrypointData from '../../implementations/entity/entryPoint/EntryPointData';
import EntryPointSuccess from '../../implementations/entity/entryPoint/EntryPointSuccess';

export default interface IController {
    execute(pData: EntrypointData): Promise<EntryPointSuccess>;
}
