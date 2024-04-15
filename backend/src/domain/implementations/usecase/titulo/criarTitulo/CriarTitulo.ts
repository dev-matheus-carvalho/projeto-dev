import UnitOfWork from '../../../entity/UnitOfWork';
import { Titulo } from '../../../entity/objectValues/Titulo';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { CriarTituloInput } from './CriarTituloInput';
import { CriarTituloOutput } from './CriarTituloOutput';
import { v4 } from 'uuid';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import { Lote } from '../../../entity/objectValues/Lote';
import { FormatarData } from '../../../services/formatarData';
import { verificarVencimento } from '../../../services/verificarVencimento';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';

export class CriarTitulo {
  constructor(
    private tituloRepository: ITituloRepository, 
    private loteRepository: ILoteRepository,
    private contaRepository: IContaRepository) {
  }
  public async execute(pUnitOfWork: UnitOfWork, pInputTitulo: CriarTituloInput): Promise<CriarTituloOutput | null | any> {

    const vencimento = FormatarData(pInputTitulo.vencimento);
    const situacaoTitulo = verificarVencimento(vencimento);
    let idLote = pInputTitulo.idLote;

    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pInputTitulo.idConta);
    
    if(!isUsuarioExist) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    if(idLote === '' || idLote === null || idLote === undefined) {
      const data = new Date();
      const lote = new Lote({
        idLote: v4(),
        situacao: 'NÃO ENVIADO',
        dataLote: new Date(data.setHours(0, 0, 0, 0)),
        idConta: pInputTitulo.idConta,
      });

      await this.loteRepository.criar(pUnitOfWork, lote);
      idLote = lote.idLote;
    }

    
    const isLoteExist = await this.loteRepository.buscaLotePorId(pUnitOfWork, idLote);
    
    if(!isLoteExist) {
      throw new InformacaoNaoEncontrada('Lote não encontrado');
    }

    const titulo = new Titulo({
        idTitulo: v4(),
        numeroTitulo: pInputTitulo.numeroTitulo,
        tipoTitulo: pInputTitulo.tipoTitulo,
        vencimento: vencimento,
        situacaoTitulo: situacaoTitulo,
        duplicataChaveNota: pInputTitulo.duplicataChaveNota,
        duplicataProtocoloNota: pInputTitulo.duplicataProtocoloNota,
        duplicataNumeroNota: pInputTitulo.duplicataNumeroNota,
        duplicataSerieNota: pInputTitulo.duplicataSerieNota,
        duplicataDataEmissao: new Date(),
        duplicataNumeroFatura: pInputTitulo.duplicataNumeroFatura,
        duplicataValorLiquidoFatura: pInputTitulo.duplicataValorLiquidoFatura,
        valorDoTitulo: pInputTitulo.valorDoTitulo,
        chequeCmc7: pInputTitulo.chequeCmc7,
        idConta: pInputTitulo.idConta,
        idPagador: pInputTitulo.idPagador,
        idLote: idLote,
        isProcessado: pInputTitulo.isProcessado,
      });
      
      const titulosPorLote = await this.tituloRepository.listarTitulosPorLote(pUnitOfWork, titulo.idLote, titulo.idConta);
      await this.tituloRepository.criar(pUnitOfWork, titulo);
      const soma = titulosPorLote.reduce((total, valor) => total + valor.valorDoTitulo, 0);
      const somaTotal = soma + pInputTitulo.valorDoTitulo;
      await this.loteRepository.editarValorTotalDeTitulosPorLote(pUnitOfWork, idLote, somaTotal, titulosPorLote.length + 1);

      return new CriarTituloOutput(titulo);
  }
}
