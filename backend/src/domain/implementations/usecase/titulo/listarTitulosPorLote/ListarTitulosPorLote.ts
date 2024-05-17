import UnitOfWork from '../../../entity/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { Titulo } from '../../../entity/objectValues/Titulo';
import { ListarTitulosPorLoteInput } from './ListarTitulosPorLoteInput';
import { ListarTitulosOutput } from './ListarTitulosPorLoteOutput';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import AcaoInvalida from '../../../entity/errors/AcaoInvalida';
import { TipoTituloEnum } from '../../../constants/enum/tipoTituloEnum';
import { SituacaoTituloEnum } from '../../../constants/enum/situacaoTituloEnum';

export class ListarTitulosPorLote {
  constructor(
    private titulosRepository: ITituloRepository,
    private loteRepository: ILoteRepository,
    private contaRepository: IContaRepository
  ) { }

  public async execute(pUnitWork: UnitOfWork, pInputTitulo: ListarTitulosPorLoteInput): Promise<ListarTitulosOutput[]> {

    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitWork, pInputTitulo.idConta);
    
    if(!!isUsuarioExist === false) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }
    
    const isLoteExist = await this.loteRepository.buscaLotePorId(pUnitWork, pInputTitulo.idLote);
    
    if(!!isLoteExist === false) {
      throw new InformacaoNaoEncontrada('Lote não encontrado');
    }

    const titulosPorLote: Titulo[] = await this.titulosRepository.listarTitulosPorLote(pUnitWork, pInputTitulo.idLote, pInputTitulo.idConta);
    
    for(let titulo of titulosPorLote) {
      await this.titulosRepository.atualizarSituacaoTitulo(pUnitWork, titulo.situacaoTitulo, titulo.idTitulo, pInputTitulo.idConta);
    }

    if(titulosPorLote.length === 0) {
      throw new AcaoInvalida('Títulos já processados');
    }
    return titulosPorLote.map(pTitulo => new ListarTitulosOutput(pTitulo));
  }
}