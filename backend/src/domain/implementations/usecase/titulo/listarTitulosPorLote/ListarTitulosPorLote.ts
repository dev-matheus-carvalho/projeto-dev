import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { Titulo } from '../../../entity/objectValues/Titulo';
import { ListarTitulosPorLoteInput } from './ListarTitulosPorLoteInput';
import { ListarTitulosOutput } from './ListarTitulosPorLoteOutput';

export class ListarTitulosPorLote {
  constructor(private titulosRepository: ITituloRepository) { }

  public async execute(pInputTitulo: ListarTitulosPorLoteInput): Promise<Array<ListarTitulosOutput>> {
    const titulosPorLote = await this.titulosRepository.listarTitulosPorLote(pInputTitulo.idLote, pInputTitulo.email);
    return titulosPorLote;
  }
}