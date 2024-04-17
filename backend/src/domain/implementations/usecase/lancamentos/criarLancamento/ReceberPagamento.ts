import UnitOfWork from '../../../entity/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { v4 } from 'uuid';
import { FormatarData } from '../../../services/formatarData';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import { ReceberPagamentoInput } from './ReceberPagamentoInput';
import { Titulo } from '../../../entity/objectValues/Titulo';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import { Lancamento } from '../../../entity/objectValues/Lancamento';
import IMovimentacaoRepository from '../../../../protocols/repository/movimentacaoRepository';
import ILancamentoRepository from '../../../../protocols/repository/lancamentoRepository';


export class ReceberPagamento {
  constructor(
    private tituloRepository: ITituloRepository, 
    private contaRepository: IContaRepository,
    private movimentacaoRepository: IMovimentacaoRepository,
    private lancamentoRepository: ILancamentoRepository,
  ) {
  }
  public async execute(pUnitOfWork: UnitOfWork, pInputLancamento: ReceberPagamentoInput): Promise<boolean | any> {

    const dataRecebimento = FormatarData(pInputLancamento.dataEvento);
    const dataCredito = FormatarData(pInputLancamento.dataCredito);
    const valorTotal = pInputLancamento.valorMulta + pInputLancamento.valorJuros - pInputLancamento.desconto;

    const titulo: Titulo = new Titulo({
      idTitulo: pInputLancamento.idTitulo,
      idConta: pInputLancamento.idConta,
    });

    const lancamento = new Lancamento({
      idLancamento: v4(),
      dataEvento: dataRecebimento,
      dataCredito: dataCredito,
      valorPrincipal: pInputLancamento.valorPrincipal,
      valorMulta: pInputLancamento.valorMulta,
      valorJuros: pInputLancamento.valorJuros,
      desconto: pInputLancamento.desconto,
      tipoPagamento: pInputLancamento.tipoPagamento,
      ativo: pInputLancamento.ativo,
      valorTotal: valorTotal,
      idTitulo: pInputLancamento.idTitulo,
      idConta: pInputLancamento.idConta,
    });

    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pInputLancamento.idConta);
    const isTituloExist = await this.tituloRepository.verificarSeExisteTitulo(pUnitOfWork, titulo);

    if(!isUsuarioExist) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    if(!isTituloExist) {
      throw new InformacaoNaoEncontrada('Título não encontrado');
    }

    await this.lancamentoRepository.criar(pUnitOfWork, lancamento);
    
  }
}
