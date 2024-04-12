import UnitOfWork from '../../../entity/UnitOfWork';
import { Titulo } from '../../../entity/objectValues/Titulo';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { EditarTituloInput } from './EditarTituloInput';
import { EditarTituloOutput } from './EditarTituloOutput';
import { v4 } from 'uuid';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import { Lote } from '../../../entity/objectValues/Lote';
import { FormatarData } from '../../../services/formatarData';
import { verificarVencimento } from '../../../services/verificarVencimento';
import InformacaoDuplicada from '../../../entity/errors/InformacaoDuplicada';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';

export class EditarTitulo {
  constructor(
    private tituloRepository: ITituloRepository,
    private loteRepository: ILoteRepository,
    private contaRepository: IContaRepository
  ) {
  }
  
  public async execute(pUnitOfWork: UnitOfWork, pInputTitulo: EditarTituloInput): Promise<EditarTituloOutput> {
    const vencimento = FormatarData(pInputTitulo.vencimento);
    const situacaoTitulo = verificarVencimento(vencimento);

    const titulo = new Titulo({
      idTitulo: pInputTitulo.idTitulo,
      numeroTitulo: pInputTitulo.numeroTitulo,
      tipoTitulo: pInputTitulo.tipoTitulo,
      vencimento: vencimento,
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

    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pInputTitulo.idConta);
    const isLoteExist = await this.loteRepository.buscaLotePorId(pUnitOfWork, titulo.idLote);
    const isTituloExist = await this.tituloRepository.verificarSeExisteTitulo(pUnitOfWork, titulo);


    if(!isUsuarioExist) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    if(!isLoteExist) {
      throw new InformacaoNaoEncontrada('Lote não encontrado');
    }

    if(!isTituloExist) {
      throw new InformacaoDuplicada('Título não encontrado');
    }

    await this.tituloRepository.editar(pUnitOfWork, titulo);
    return new EditarTituloOutput(titulo);
  }
}