import UnitOfWork from '../../../../protocols/models/entity/objectValues/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { Titulo } from '../../../entity/objectValues/Titulo';
import { ListarTitulosPorLoteInput } from './ListarTitulosPorLoteInput';
import { ListarTitulosOutput } from './ListarTitulosPorLoteOutput';

export class ListarTitulosPorLote {
  constructor(private titulosRepository: ITituloRepository) { }

  public async execute(pUnitWork: UnitOfWork, pInputTitulo: ListarTitulosPorLoteInput): Promise<Array<ListarTitulosOutput>> {
    const titulosPorLote: Array<Titulo> = await this.titulosRepository.listarTitulosPorLote(pInputTitulo.idLote, pInputTitulo.email);
    return titulosPorLote;
  }
}