import UnitOfWork from '../../../entity/UnitOfWork';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import { Lote } from '../../../entity/objectValues/Lote';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import { ExcluirLoteInput } from './ExcluirLoteInput';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';

export class ExcluirLote {
  constructor(
    private lotesRepository: ILoteRepository,
    private contaRepository: IContaRepository,
    private tituloRepository: ITituloRepository,
  ) { }

  public async execute(pUnitOfWork: UnitOfWork, pInputLote: ExcluirLoteInput): Promise<boolean> {
    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pInputLote.idConta);
    
    if(!!isUsuarioExist === false) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }
    
    const isLoteExist = await this.lotesRepository.buscaLotePorId(pUnitOfWork, pInputLote.idLote);
    
    if(!!isLoteExist === false) {
      throw new InformacaoNaoEncontrada('Lote não encontrado');
    }

    await this.tituloRepository.excluirTodosOsTitulosdeUmLote(pUnitOfWork, pInputLote.idLote, pInputLote.idConta);
    await this.lotesRepository.ExcluirLote(pUnitOfWork, pInputLote.idLote, pInputLote.idConta);

    return Promise.resolve(true);
    
  }
}