import UnitOfWork from '../../../entity/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { ExcluirTituloInput } from './ExcluirTituloInput';

export class ExcluirTitulo {
  constructor(private titulosRepository: ITituloRepository) { }

  public async execute(pUnitWork: UnitOfWork, pInputTitulo: ExcluirTituloInput): Promise<boolean> {
    const tituloExist = await this.titulosRepository.buscarTituloPorIdDoTituloEEmail(pInputTitulo.idTitulo, pInputTitulo.email);

    if(tituloExist) {
      await this.titulosRepository.excluir(pUnitWork, pInputTitulo.idTitulo, pInputTitulo.email);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}