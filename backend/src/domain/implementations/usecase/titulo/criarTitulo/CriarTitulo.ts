import UnitOfWork from '../../../entity/UnitOfWork';
import { Titulo } from '../../../entity/objectValues/Titulo';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { CriarTituloInput } from './CriarTituloInput';
import { CriarTituloOutput } from './CriarTituloOutput';
import { v4 } from 'uuid';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import { Lote } from '../../../entity/objectValues/Lote';

export class CriarTitulo {
  constructor(private tituloRepository: ITituloRepository, 
    private loteRepository: ILoteRepository) {
  }
  
  public async execute(pUnitOfWork: UnitOfWork, pInputTitulo: CriarTituloInput): Promise<CriarTituloOutput | null> {
    const dataString = pInputTitulo.vencimento;
    const dividirData = dataString.split('/');
    const dia = parseInt(dividirData[0], 10);
    const mes = parseInt(dividirData[1], 10) - 1;
    const ano = parseInt(dividirData[2], 10);
    const vencimento = new Date(ano, mes, dia);

    // Verifica se o idLote veio preenchido, vazio, nulo ou undefined

    if(pInputTitulo.idLote === '' || pInputTitulo.idLote === null || pInputTitulo.idLote === undefined) {
      // idLote vazio, então cria-se um lote  
      const lote = new Lote({
        idLote: v4(),
        situacao: 'NÃO ENVIADO',
        dataLote: new Date(),
        email: pInputTitulo.email,
      });

      const titulo = new Titulo({
        idTitulo: v4(),
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
        idLote: lote.idLote,
        // idMovimentacao: pInputTitulo.idMovimentacao,
        // idLancamento: pInputTitulo.idLancamento,
        isProcessado: pInputTitulo.isProcessado
      });

      await this.loteRepository.criar(pUnitOfWork, lote);
      await this.tituloRepository.criar(pUnitOfWork, titulo);
      const a = await this.tituloRepository.listarTitulosPorLote(lote.idLote, pInputTitulo.email);
      console.log()
      console.log()
      console.log('===== Lista de títulos com o mesmo lote =====')
      console.log(a)
      console.log('Qtd de títlos por Lote: ', a.length + 1)
      console.log()
      console.log()
      return new CriarTituloOutput(titulo);
    }

    // idLote preenchido
    const titulo = new Titulo({
      idTitulo: v4(),
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
    const a = await this.tituloRepository.listarTitulosPorLote(pInputTitulo.idLote, pInputTitulo.email);
    await this.tituloRepository.criar(pUnitOfWork, titulo);
    const soma = a.reduce((total, valor) => total + valor.valorDoTitulo, 0);
    console.log(soma + pInputTitulo.valorDoTitulo);
    // console.log()
    // console.log('===== Lista de títulos com o mesmo lote =====')
    // console.log(a)
    // console.log('Qtd de títlos por Lote: ', a.length + 1)
    // console.log()
    // console.log()
    return new CriarTituloOutput(titulo);

  }
}