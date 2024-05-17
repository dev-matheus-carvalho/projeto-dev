import UnitOfWork from '../../../entity/UnitOfWork';
import { Titulo } from '../../../entity/objectValues/Titulo';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { EditarTituloInput } from './EditarTituloInput';
import { EditarTituloOutput } from './EditarTituloOutput';
import { v4 } from 'uuid';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import { Lote } from '../../../entity/objectValues/Lote';
import { FormatarData } from '../../../services/formatarData';
import { verificarSituacaoDeVencimentoDoTitulo, verificarVencimento } from '../../../services/verificarVencimento';
import InformacaoDuplicada from '../../../entity/errors/InformacaoDuplicada';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import AcaoInvalida from '../../../entity/errors/AcaoInvalida';

export class EditarTitulo {
  constructor(
    private tituloRepository: ITituloRepository,
    private loteRepository: ILoteRepository,
    private contaRepository: IContaRepository
  ) {
  }
  
  public async execute(pUnitOfWork: UnitOfWork, pInputTitulo: EditarTituloInput): Promise<EditarTituloOutput> {
    const dataDeVencimentoDoTitulo = FormatarData(pInputTitulo.vencimento);
    const situacaoTitulo = new verificarSituacaoDeVencimentoDoTitulo(dataDeVencimentoDoTitulo).verificarVencimentoDoTitulo();

    // 1º: Descobrir se usuário, lote e título existem
    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pInputTitulo.idConta);

    if(!!isUsuarioExist === false) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    const isLoteExist = await this.loteRepository.buscaLotePorId(pUnitOfWork, pInputTitulo.idLote);

    if(!!isLoteExist === false) {
      throw new InformacaoNaoEncontrada('Lote não encontrado');
    }

    const isTituloExist = await this.tituloRepository.verificarSeExisteTitulo(pUnitOfWork, pInputTitulo.idTitulo, pInputTitulo.idConta);

    if(!!isTituloExist === false) {
      throw new InformacaoDuplicada('Título não encontrado');
    }

    // 2º: Verificar se o Lote já foi processado
    if(isLoteExist.situacao === 'PROCESSADO') {
      throw new AcaoInvalida('Operação negada. Lote já processado');
    }

    const titulo = new Titulo({
      idTitulo: pInputTitulo.idTitulo,
      numeroTitulo: pInputTitulo.numeroTitulo,
      tipoTitulo: pInputTitulo.tipoTitulo,
      vencimento: dataDeVencimentoDoTitulo,
      situacaoTitulo: situacaoTitulo,
      duplicataChaveNota: pInputTitulo.duplicataChaveNota,
      duplicataProtocoloNota: pInputTitulo.duplicataProtocoloNota,
      duplicataNumeroNota: pInputTitulo.duplicataNumeroNota,
      duplicataSerieNota: pInputTitulo.duplicataSerieNota,
      duplicataNumeroFatura: pInputTitulo.duplicataNumeroFatura,
      duplicataValorLiquidoFatura: pInputTitulo.duplicataValorLiquidoFatura,
      valorDoTitulo: pInputTitulo.valorDoTitulo,
      chequeCmc7: pInputTitulo.chequeCmc7,
      idConta: pInputTitulo.idConta,
      idPagador: pInputTitulo.idPagador,
      idLote: pInputTitulo.idLote,
    });
    
    const titulosPorLote = await this.tituloRepository.listarTitulosPorLote(pUnitOfWork, titulo.idLote, titulo.idConta);
    const soma = titulosPorLote.reduce((total, valor) => total + valor.valorDoTitulo, 0) - isTituloExist.valorDoTitulo;
    await this.tituloRepository.editar(pUnitOfWork, titulo);
    const somaTotal = soma + pInputTitulo.valorDoTitulo;
    await this.loteRepository.editarValorTotalDeTitulosPorLote(pUnitOfWork, pInputTitulo.idLote, somaTotal, titulosPorLote.length + 1);
    
    return new EditarTituloOutput(titulo);
  }
}