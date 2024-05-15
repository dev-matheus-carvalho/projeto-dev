import UnitOfWork from '../../../entity/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import { ProcessarLoteInput } from './ProcessarLoteInput';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import AcaoInvalida from '../../../entity/errors/AcaoInvalida';
import { GerarData, GerarNovaData } from '../../../services/gerarData';
import { Movimentacao } from '../../../entity/objectValues/Movimentacao';
import { v4 } from 'uuid';
import IMovimentacaoRepository from '../../../../protocols/repository/movimentacaoRepository';
import ILancamentoRepository from '../../../../protocols/repository/lancamentoRepository';
import { Lancamento } from '../../../entity/objectValues/Lancamento';
import { Titulo } from '../../../entity/objectValues/Titulo';

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

    if(!!isLoteExist === false) {
      throw new InformacaoNaoEncontrada('Lote não encontrado');
    }
      
    if(!isLoteExist.dataEnvio === null || !isLoteExist.dataEnvio === null) {
      throw new AcaoInvalida('Lote já foi processado');
    }

    if(isLoteExist.situacao === 'PROCESSADO') {
      throw new AcaoInvalida('Lote já foi processado');
    }

    const listagemDeTitulos: Titulo[] = await this.tituloRepository.listarTitulosPorLote(pUnitOfWork, pInputLote.idLote, pInputLote.idConta);
    
    let numeroDoTituloTemporario = 0;

    for(let titulo of listagemDeTitulos) {
      if(numeroDoTituloTemporario === Number(titulo.numeroTitulo)) {
        throw new AcaoInvalida('Não pode processar Lote pois existem Títulos iguais');
      }
      numeroDoTituloTemporario = Number(titulo.numeroTitulo);
    }

    for(let titulo of listagemDeTitulos) {
      let movimentacao = new Movimentacao({
        idMovimentacao: v4(),
        saldo: titulo.valorDoTitulo,
        valorTotalPrincipal: titulo.valorDoTitulo,
        valorTotalMulta: 0,
        valorTotalJuros: 0,
        valorTotalDesconto: 0,
        idTitulo: titulo.idTitulo,
        idConta: titulo.idConta,
      });

      await this.movimentacaoRepository.criar(pUnitOfWork, movimentacao);
    }

    const dataDeHoje: Date = new GerarNovaData().zerarHoras();

    // dataDeHoje.zerarHoras();
    // const data = GerarData(new Date());
    // const data = dataDeHoje.zerarHoras();

    await this.loteRepository.editarLoteParaProcessado(pUnitOfWork, pInputLote.idLote, pInputLote.idConta, dataDeHoje);
    await this.tituloRepository.editarSituacaoTitulos(pUnitOfWork, pInputLote.idLote, pInputLote.idConta);

    return Promise.resolve(true);
  }
}