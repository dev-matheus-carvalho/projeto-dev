import UnitOfWork from '../../../entity/UnitOfWork';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import { Lote } from '../../../entity/objectValues/Lote';
import { ListarLotesInput } from './ListarLotesInput';
import { ListarLotesOutput } from './ListarLotesOutput';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';

export class ListarLotes {
  constructor(
    private lotesRepository: ILoteRepository,
    private contaRepository: IContaRepository,
  ) { }

  public async execute(pUnitOfWork: UnitOfWork, pInputLote: ListarLotesInput): Promise<ListarLotesOutput[]> {
    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pInputLote.idConta);
    
    if(!isUsuarioExist) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    const lotes: Lote[] = await this.lotesRepository.listarLotes(pUnitOfWork, pInputLote.idConta);
    return lotes;
  }
}