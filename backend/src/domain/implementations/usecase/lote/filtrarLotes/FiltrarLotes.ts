import UnitOfWork from '../../../entity/UnitOfWork';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import { Lote } from '../../../entity/objectValues/Lote';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import { FiltrarLotesInput } from './FiltrarLotesInput';
import { FormatarData } from '../../../services/formatarData';
import { FiltrarLotesOutput } from './FiltrarLotesOutput';

export class FiltrarLotes {
  constructor(
    private lotesRepository: ILoteRepository,
    private contaRepository: IContaRepository,
  ) { }

  public async execute(pUnitOfWork: UnitOfWork, pFiltrarLotesInput: FiltrarLotesInput): Promise<FiltrarLotesOutput[]> {

    const dataInicial = FormatarData(pFiltrarLotesInput.dataInicial);
    const dataFinal = FormatarData(pFiltrarLotesInput.dataFinal);
    let lotesDb: Lote[];
    let lotes: FiltrarLotesOutput[] = [];

    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pFiltrarLotesInput.idConta);
    
    if(!isUsuarioExist) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    if(pFiltrarLotesInput.situacao === 'Todos') {
      lotesDb = await this.lotesRepository.filtrarTodosLotes(pUnitOfWork, dataInicial, dataFinal, pFiltrarLotesInput.idConta);
      lotesDb.forEach(lote => lotes.push(lote));
      return lotes;
    }

    lotesDb = await this.lotesRepository.filtrarLotes(pUnitOfWork, dataInicial, dataFinal, pFiltrarLotesInput.situacao, pFiltrarLotesInput.idConta);
    lotesDb.forEach(lote => lotes.push(lote));

    return lotes;
    
  }
}