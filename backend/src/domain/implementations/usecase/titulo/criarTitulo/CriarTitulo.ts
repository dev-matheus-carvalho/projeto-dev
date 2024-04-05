import UnitOfWork from '../../../entity/UnitOfWork';
import { Titulo } from '../../../entity/objectValues/Titulo';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { CriarTituloInput } from './CriarTituloInput';
import { CriarTituloOutput } from './CriarTituloOutput';
import { v4 } from 'uuid';

export class CriarTitulo {
  constructor(private tituloRepository: ITituloRepository) {
  }
  
  public async execute(pUnitOfWork: UnitOfWork, pInputTitulo: CriarTituloInput): Promise<CriarTituloOutput | null> {
    const dataString = pInputTitulo.vencimento;
    const dividirData = dataString.split('/');
    const dia = parseInt(dividirData[0], 10);
    const mes = parseInt(dividirData[1], 10) - 1;
    const ano = parseInt(dividirData[2], 10);
    const vencimento = new Date(ano, mes, dia);
    
    const titulo = new Titulo({
      numeroTitulo: pInputTitulo.numeroTitulo,
      tipoTitulo: pInputTitulo.tipoTitulo,
      vencimento: vencimento,
      situacaoTitulo: pInputTitulo.situacaoTitulo,
      duplicataChaveNota: pInputTitulo.duplicataChaveNota,
      duplicataProtocoloNota: pInputTitulo.duplicataProtocoloNota,
      duplicataNumeroNota: pInputTitulo.duplicataNumeroNota,
      duplicataSerieNota: pInputTitulo.duplicataSerieNota,
      duplicataDataEmissao: new Date(),
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


    const isTituloExist = await this.tituloRepository.buscarTituloPorNumeroDoTitulo(titulo.numeroTitulo);
    
    if (!isTituloExist) {
      if(pInputTitulo.idLote === '' || pInputTitulo.idLote === '') {
        console.log('Sem uuid');
        const Novotitulo = new Titulo({
          numeroTitulo: pInputTitulo.numeroTitulo,
          tipoTitulo: pInputTitulo.tipoTitulo,
          vencimento: vencimento,
          situacaoTitulo: pInputTitulo.situacaoTitulo,
          duplicataChaveNota: pInputTitulo.duplicataChaveNota,
          duplicataProtocoloNota: pInputTitulo.duplicataProtocoloNota,
          duplicataNumeroNota: pInputTitulo.duplicataNumeroNota,
          duplicataSerieNota: pInputTitulo.duplicataSerieNota,
          duplicataDataEmissao: new Date(),
          duplicataNumeroFatura: pInputTitulo.duplicataNumeroFatura,
          duplicataValorLiquidoFatura: pInputTitulo.duplicataValorLiquidoFatura,
          valorDoTitulo: pInputTitulo.valorDoTitulo,
          chequeCmc7: pInputTitulo.chequeCmc7,
          email: pInputTitulo.email,
          identificacao: pInputTitulo.identificacao,
          idLote: v4(),
          // idMovimentacao: pInputTitulo.idMovimentacao,
          // idLancamento: pInputTitulo.idLancamento,
          isProcessado: pInputTitulo.isProcessado
        });

        await this.tituloRepository.criar(pUnitOfWork, Novotitulo);
        return new CriarTituloOutput(Novotitulo);
      }
      console.log('Com uuid');
      await this.tituloRepository.criar(pUnitOfWork, titulo);
      return new CriarTituloOutput(titulo);
    }
    return null;
  }
}