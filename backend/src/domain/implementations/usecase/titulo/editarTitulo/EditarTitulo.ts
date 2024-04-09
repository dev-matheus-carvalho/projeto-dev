import UnitOfWork from '../../../entity/UnitOfWork';
import { Titulo } from '../../../entity/objectValues/Titulo';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { EditarTituloInput } from './EditarTituloInput';
import { EditarTituloOutput } from './EditarTituloOutput';
import { v4 } from 'uuid';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import { Lote } from '../../../entity/objectValues/Lote';

export class EditarTitulo {
  constructor(private tituloRepository: ITituloRepository) {
  }
  
  public async execute(pUnitOfWork: UnitOfWork, pInputTitulo: EditarTituloInput): Promise<EditarTituloOutput | null> {
    const dataString = pInputTitulo.vencimento;
    const dividirData = dataString.split('/');
    const dia = parseInt(dividirData[0], 10);
    const mes = parseInt(dividirData[1], 10) - 1;
    const ano = parseInt(dividirData[2], 10);
    const vencimento = new Date(ano, mes, dia);

    const titulo = new Titulo({
      idTitulo: pInputTitulo.idTitulo,
      numeroTitulo: pInputTitulo.numeroTitulo,
      tipoTitulo: pInputTitulo.tipoTitulo,
      vencimento: vencimento,
      situacaoTitulo: pInputTitulo.situacaoTitulo,
      duplicataChaveNota: pInputTitulo.duplicataChaveNota,
      duplicataProtocoloNota: pInputTitulo.duplicataProtocoloNota,
      duplicataNumeroNota: pInputTitulo.duplicataNumeroNota,
      duplicataSerieNota: pInputTitulo.duplicataSerieNota,
      duplicataNumeroFatura: pInputTitulo.duplicataNumeroFatura,
      duplicataValorLiquidoFatura: pInputTitulo.duplicataValorLiquidoFatura,
      valorDoTitulo: pInputTitulo.valorDoTitulo,
      chequeCmc7: pInputTitulo.chequeCmc7,
      email: pInputTitulo.email,
      identificacao: pInputTitulo.identificacao,
      idLote: pInputTitulo.idLote,
      // idMovimentacao: pInputTitulo.idMovimentacao,
      // idLancamento: pInputTitulo.idLancamento,
      isProcessado: pInputTitulo.isProcessado
    });

    const isTituloExist = await this.tituloRepository.buscarTituloPorIdDoTituloEEmail(pInputTitulo.idTitulo, pInputTitulo.email);

    if(isTituloExist) {
      console.log('Foi alterado')
      await this.tituloRepository.editar(pUnitOfWork, titulo);
      return new EditarTituloOutput(titulo);
    }

    console.log('Não foi alterado')

    return null

  }
}