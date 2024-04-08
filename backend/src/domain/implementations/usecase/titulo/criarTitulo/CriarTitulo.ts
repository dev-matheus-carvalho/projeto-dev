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
  
  public async execute(pUnitOfWork: UnitOfWork, pInputTitulo: CriarTituloInput): Promise<CriarTituloOutput | null | any> {
    const dataString = pInputTitulo.vencimento;
    const dividirData = dataString.split('/');
    const dia = parseInt(dividirData[0], 10);
    const mes = parseInt(dividirData[1], 10) - 1;
    const ano = parseInt(dividirData[2], 10);
    const vencimento = new Date(ano, mes, dia);

    // Verifica se é Duplicata, Nota Promissória ou Cheque
    if(pInputTitulo.tipoTitulo === 'DUPLICATA' || pInputTitulo.tipoTitulo === 'NOTA PROMISSORIA') {
      // Verifica se o titulo existe passando o número do título e o email
      const isTituloExist = await this.tituloRepository.buscarTituloPorNumeroEEmailDoTitulo(pInputTitulo.numeroTitulo, pInputTitulo.email);
      // Se esse título não existir, verifica se o idLote é vazio, nulo ou undefined
      console.log()
      console.log()
      console.log('Existe DP ou NP: ',isTituloExist)
      console.log('Email: ', pInputTitulo.email)
      console.log('idLote: ', pInputTitulo.idLote)
      console.log()
      console.log()
      if(!isTituloExist) {
        console.log('Precisa criar Lote em DP e NP')
        if(pInputTitulo.idLote === '' || pInputTitulo.idLote === null || pInputTitulo.idLote === undefined) {
          // Se idLote for é vazio, nulo ou undefined cria o titulo com um novo lote
          
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
          return new CriarTituloOutput(titulo);
        }
        // Se não, cria o titulo com o idLote passado
        console.log('Não precisa criar Lote em CH')
        
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
        await this.tituloRepository.criar(pUnitOfWork, titulo);
        return new CriarTituloOutput(titulo);
      }
      return null;
    } 
    
    if(pInputTitulo.tipoTitulo === 'CHEQUE') {
      // Verifica se existe um cheque com o número, email e identificação passados
      const isTituloExist = await this.tituloRepository.buscarTituloPorNumeroEmailEPagadorDoTitulo(pInputTitulo.numeroTitulo, pInputTitulo.email, pInputTitulo.identificacao);
      console.log()
      console.log()
      console.log('Existe CH: ',isTituloExist)
      console.log('Email: ', pInputTitulo.email)
      console.log('idLote: ', pInputTitulo.idLote)
      console.log()
      console.log()
      // Se esse título não existir, verifica se o idLote é vazio, nulo ou undefined
      if(!isTituloExist) {
        if(pInputTitulo.idLote === '' || pInputTitulo.idLote === null || pInputTitulo.idLote === undefined) {
          // Se idLote for é vazio, nulo ou undefined cria o titulo com um novo lote
          console.log('Precisa criar Lote em CH')
          
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
          return new CriarTituloOutput(titulo);
        }
        // Se não, cria o titulo com o idLote passado
        console.log('Não precisa criar Lote em CH')
        
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
          await this.tituloRepository.criar(pUnitOfWork, titulo);
          return new CriarTituloOutput(titulo);
      }
      return null;
    }

    return null;
  }
}