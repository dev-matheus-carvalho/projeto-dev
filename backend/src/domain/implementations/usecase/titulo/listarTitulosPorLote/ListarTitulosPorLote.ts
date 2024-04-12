import UnitOfWork from '../../../entity/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { Titulo } from '../../../entity/objectValues/Titulo';
import { ListarTitulosPorLoteInput } from './ListarTitulosPorLoteInput';
import { ListarTitulosOutput } from './ListarTitulosPorLoteOutput';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';

export class ListarTitulosPorLote {
  constructor(
    private titulosRepository: ITituloRepository,
    private loteRepository: ILoteRepository,
    private contaRepository: IContaRepository
  ) { }

  public async execute(pUnitWork: UnitOfWork, pInputTitulo: ListarTitulosPorLoteInput): Promise<ListarTitulosOutput[]> {
    const titulo = new Titulo({
      idConta: pInputTitulo.idConta,
      idLote: pInputTitulo.idLote
    });
    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitWork, pInputTitulo.idConta);
    const isLoteExist = await this.loteRepository.buscaLotePorId(pUnitWork, titulo.idLote);

    if(!isUsuarioExist) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    if(!isLoteExist) {
      throw new InformacaoNaoEncontrada('Lote não encontrado');
    }

    const titulosPorLote: Titulo[] = await this.titulosRepository.listarTitulosPorLote(pUnitWork, titulo);
    return titulosPorLote;
  }
}