import UnitOfWork from '../../../entity/UnitOfWork';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import { Lote } from '../../../entity/objectValues/Lote';
import { ListarLotesInput } from './ListarLotesInput';
import { ListarLotesOutput } from './ListarLotesOutput';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import { Conta } from '../../../entity/objectValues/Conta';
import { FormatarData, transformarDataStringParaOTipoDate } from '../../../services/formatarData';

export class ListarLotes {
  constructor(
    private lotesRepository: ILoteRepository,
    private contaRepository: IContaRepository,
  ) { }

  public async execute(pUnitOfWork: UnitOfWork, pInputLote: ListarLotesInput): Promise<ListarLotesOutput[]> {

    const isUsuarioExist: Conta | null = await this.contaRepository.buscarUsuario(pUnitOfWork, pInputLote.idConta);
    
    if(!!isUsuarioExist === false) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    if(pInputLote.dataInicial === undefined || pInputLote.dataFinal === undefined) {
      const lotesDb: Lote[] = await this.lotesRepository.listarLotes(pUnitOfWork, pInputLote.idConta);
      return lotesDb.map(pLote => new ListarLotesOutput(pLote));
    }

    const dataInicial: Date = new transformarDataStringParaOTipoDate().dataFormatada(pInputLote.dataInicial);
    const dataFinal: Date = new transformarDataStringParaOTipoDate().dataFormatada(pInputLote.dataFinal);

    if(pInputLote.situacao === 'Todos') {
      const lotesDb: Lote[] = await this.lotesRepository.filtrarTodosLotes(pUnitOfWork, dataInicial, dataFinal, pInputLote.idConta);
      return lotesDb.map(pLote => new ListarLotesOutput(pLote));;
    }

    const lotesDb: Lote[] = await this.lotesRepository.filtrarLotes(pUnitOfWork, dataInicial, dataFinal, pInputLote.situacao!, pInputLote.idConta);

    return lotesDb.map(pLote => new ListarLotesOutput(pLote));
  }
}