import UnitOfWork from '../../../entity/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { Titulo } from '../../../entity/objectValues/Titulo';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import IMovimentacaoRepository from '../../../../protocols/repository/movimentacaoRepository';
import { ListarTitulosProcessadosInput } from './ListarTitulosProcessadosInput';
import { ListarTitulosProcessadosOutput } from './ListarTitulosProcessadosOutput';
import { verificarVencimento } from '../../../services/verificarVencimento';
import IPagadorRepository from '../../../../protocols/repository/pagadorRepository';
import { Pagador } from '../../../entity/objectValues/Pagador';
import { BuscarPagador } from '../../pagador/buscarPagador/BuscarPagador';

export class ListarTitulosProcessados {
  constructor(
    private titulosRepository: ITituloRepository,
    private contaRepository: IContaRepository,
    private movimentacaoRepository: IMovimentacaoRepository,
    private pagadorRepository: IPagadorRepository,
  ) { }

  public async execute(pUnitWork: UnitOfWork, pInputTitulo: ListarTitulosProcessadosInput): Promise<ListarTitulosProcessadosOutput[] | any> {
    
    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitWork, pInputTitulo.idConta);

    if(!isUsuarioExist) {
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

    for(let i of titulosDb) {

      const titulo: Titulo = new Titulo({
        situacaoTitulo: verificarVencimento(i.vencimento),
        idTitulo: i.idTitulo,
        idConta: i.idConta,
      });

      const pagador: Pagador = new Pagador({
        idPagador: i.idPagador,
        idConta: i.idConta,
      });

      const movimentacaoDb = await this.movimentacaoRepository.buscarMovimentacao(pUnitWork ,i.idTitulo, i.idConta);
      const pagadorDb = await this.pagadorRepository.buscarPagador(pUnitWork, pagador);
      await this.titulosRepository.atualizarVencimento(pUnitWork, titulo);

      aux = ({
        numeroTitulo: i.numeroTitulo,
        tipoTitulo: i.tipoTitulo,
        vencimento: i.vencimento,
        pagamento: movimentacaoDb?.dataUltimoRecebimento,
        situacaoTitulo: i.situacaoTitulo,
        valorDoTitulo: i.valorDoTitulo,
        idConta: i.idConta,
        pagador: pagadorDb?.nome
      });
      
      listaDeTitulosOutput.push(aux);
    }

    return listaDeTitulosOutput;

  }
}