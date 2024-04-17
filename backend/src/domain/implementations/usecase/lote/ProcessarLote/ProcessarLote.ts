import UnitOfWork from '../../../entity/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import { ProcessarLoteInput } from './ProcessarLoteInput';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import AcaoInvalida from '../../../entity/errors/AcaoInvalida';
import { GerarData } from '../../../services/gerarData';
import { Movimentacao } from '../../../entity/objectValues/Movimentacao';
import { v4 } from 'uuid';
import IMovimentacaoRepository from '../../../../protocols/repository/movimentacaoRepository';
import ILancamentoRepository from '../../../../protocols/repository/lancamentoRepository';
import { Lancamento } from '../../../entity/objectValues/Lancamento';

export class ProcessarLote {
  constructor(
    private tituloRepository: ITituloRepository, 
    private loteRepository: ILoteRepository,
    private movimentacaoRepository: IMovimentacaoRepository,
    private lancamentoRepository: ILancamentoRepository,
  ) {
  }
  
  public async execute(pUnitOfWork: UnitOfWork, pInputLote: ProcessarLoteInput): Promise<boolean> {
    const isLoteExist = await this.loteRepository.buscaLotePorId(pUnitOfWork, pInputLote.idLote);

    if(!isLoteExist) {
      throw new InformacaoNaoEncontrada('Lote não encontrado');
    }
      
    if(!isLoteExist.dataEnvio === null || !isLoteExist.dataEnvio === null) {
      throw new AcaoInvalida('Lote já foi processado');
    }

    // if(isLoteExist.situacao === 'PROCESSADO') {
    //   throw new AcaoInvalida('Lote já foi processado');
    // }

    const listagemDeTitulos = await this.tituloRepository.listarTitulosPorLote(pUnitOfWork, pInputLote.idLote, pInputLote.idConta);
    let aux = 0;

    for(let i of listagemDeTitulos) {
      if(aux === Number(i.numeroTitulo)) {
        throw new AcaoInvalida('Não pode processar Lote pois existem Títulos iguais');
      }
      aux = Number(i.numeroTitulo);
    }

    for(let i of listagemDeTitulos) {
      let movimentacao = new Movimentacao({
        idMovimentacao: v4(),
        saldo: i.valorDoTitulo,
        valorTotalPrincipal: i.valorDoTitulo,
        valorTotalMulta: 0,
        valorTotalJuros: 0,
        valorTotalDesconto: 0,
        idTitulo: i.idTitulo,
        idConta: i.idConta,
      });

      await this.movimentacaoRepository.criar(pUnitOfWork, movimentacao);
    }

    const data = GerarData(new Date());
    await this.loteRepository.editarLoteParaProcessado(pUnitOfWork, pInputLote.idLote, pInputLote.idConta, data);
    await this.tituloRepository.editarSituacaoTitulos(pUnitOfWork, pInputLote.idLote, pInputLote.idConta);

    return Promise.resolve(true);
  }
}