import UnitOfWork from '../../../entity/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { Titulo } from '../../../entity/objectValues/Titulo';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import IMovimentacaoRepository from '../../../../protocols/repository/movimentacaoRepository';
import { ListarTitulosProcessadosInput } from './ListarTitulosProcessadosInput';
import { ListarTitulosProcessadosOutput } from './ListarTitulosProcessadosOutput';
import { verificarSituacaoDeVencimentoDoTitulo, verificarVencimento } from '../../../services/verificarVencimento';
import IPagadorRepository from '../../../../protocols/repository/pagadorRepository';
import { Pagador } from '../../../entity/objectValues/Pagador';
import { BuscarPagador } from '../../pagador/buscarPagador/BuscarPagador';
import { Conta } from '../../../entity/objectValues/Conta';
import { Movimentacao } from '../../../entity/objectValues/Movimentacao';

export class ListarTitulosProcessados {
  constructor(
    private titulosRepository: ITituloRepository,
    private contaRepository: IContaRepository,
    private movimentacaoRepository: IMovimentacaoRepository,
    private pagadorRepository: IPagadorRepository,
  ) { }

  public async execute(pUnitWork: UnitOfWork, pInputTitulo: ListarTitulosProcessadosInput): Promise<ListarTitulosProcessadosOutput[] | any> {
    
    const isUsuarioExist: Conta | null = await this.contaRepository.buscarUsuario(pUnitWork, pInputTitulo.idConta);

    if(!!isUsuarioExist === false) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    const titulosDb: Titulo[] = await this.titulosRepository.listarTitulosProcessados(pUnitWork, pInputTitulo.idConta);
    const listaDeTitulosOutput: ListarTitulosProcessadosOutput[] = [];

    let aux: ListarTitulosProcessadosOutput = {
      numeroTitulo: '',
      tipoTitulo: '',
      vencimento: new Date(),
      pagamento: new Date(),
      situacaoTitulo: '',
      valorDoTitulo: 0,
      idConta: '',
      pagador: '',
    };

    for(let titulo of titulosDb) {

      titulo.situacaoTitulo = new verificarSituacaoDeVencimentoDoTitulo(titulo.vencimento)
      .verificarVencimentoDoTitulo();

      const movimentacaoDb: Movimentacao | null = await this.movimentacaoRepository.buscarMovimentacao(pUnitWork ,titulo.idTitulo, titulo.idConta);
      const pagadorDb: Pagador | null = await this.pagadorRepository.buscarPagador(pUnitWork, titulo.idPagador, titulo.idConta);
      await this.titulosRepository.atualizarSituacaoTitulo(pUnitWork, titulo.situacaoTitulo, titulo.idTitulo, pInputTitulo.idConta);

      aux = ({
        numeroTitulo: titulo.numeroTitulo,
        tipoTitulo: titulo.tipoTitulo,
        vencimento: titulo.vencimento,
        pagamento: movimentacaoDb?.dataUltimoRecebimento,
        situacaoTitulo: titulo.situacaoTitulo,
        valorDoTitulo: titulo.valorDoTitulo,
        idConta: titulo.idConta,
        pagador: pagadorDb?.nome
      });
      
      listaDeTitulosOutput.push(aux);

      // return new ListarTitulosProcessadosOutput(titulo, movimentacaoDb!, pagadorDb!);
    }
    // return listaDeTitulosOutput;
    return titulosDb.map(titulo => {
      
    });

    // return titulosDb.map(async titulo => {
    //   titulo.situacaoTitulo = new verificarSituacaoDeVencimentoDoTitulo(titulo.vencimento)
    //   .verificarVencimentoDoTitulo();

    //   const movimentacaoDb: Movimentacao | null = await this.movimentacaoRepository.buscarMovimentacao(pUnitWork ,titulo.idTitulo, titulo.idConta);
    //   const pagadorDb: Pagador | null = await this.pagadorRepository.buscarPagador(pUnitWork, titulo.idPagador, titulo.idConta);
    //   await this.titulosRepository.atualizarSituacaoTitulo(pUnitWork, titulo.situacaoTitulo, titulo.idTitulo, pInputTitulo.idConta);

    //   new  ListarTitulosProcessadosOutput(titulo, movimentacaoDb!, pagadorDb!);
    // });

  }
}