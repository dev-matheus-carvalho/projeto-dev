import UnitOfWork from '../../../entity/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { Titulo } from '../../../entity/objectValues/Titulo';
import { ListarTitulosPorLoteInput } from './ListarTitulosPorLoteInput';
import { ListarTitulosOutput } from './ListarTitulosPorLoteOutput';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import AcaoInvalida from '../../../entity/errors/AcaoInvalida';
import { TipoTituloEnum } from '../../../constants/enum/tipoTituloEnum';
import { SituacaoTituloEnum } from '../../../constants/enum/situacaoTituloEnum';

export class ListarTitulosPorLote {
  constructor(
    private titulosRepository: ITituloRepository,
    private loteRepository: ILoteRepository,
    private contaRepository: IContaRepository
  ) { }

  public async execute(pUnitWork: UnitOfWork, pInputTitulo: ListarTitulosPorLoteInput): Promise<ListarTitulosOutput[]> {
    let titulo = new Titulo({
      idConta: pInputTitulo.idConta,
      idLote: pInputTitulo.idLote
    });
    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitWork, pInputTitulo.idConta);
    const isLoteExist = await this.loteRepository.buscaLotePorId(pUnitWork, titulo.idLote);

    if(!isUsuarioExist) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    if(!isLoteExist) {
      throw new InformacaoNaoEncontrada('Lote não encontrado');
    }

    const titulosPorLote: Titulo[] = await this.titulosRepository.listarTitulosPorLote(pUnitWork, titulo.idLote, titulo.idConta);
    const listaTitulos: ListarTitulosOutput[] = [];
    
    let aux: ListarTitulosOutput = {
      idTitulo: '',
      numeroTitulo: '',
      tipoTitulo: TipoTituloEnum.DUPLICATA,
      vencimento: new Date(),
      situacaoTitulo: SituacaoTituloEnum.AVENCER,
      duplicataChaveNota: '',
      duplicataProtocoloNota: '',
      duplicataNumeroNota: '',
      duplicataSerieNota: '',
      duplicataDataEmissao: new Date(),
      duplicataNumeroFatura: '',
      duplicataValorLiquidoFatura: 0,
      valorDoTitulo: 0,
      chequeCmc7: '',
      idConta: '',
      idPagador: '',
      idLote: '',
      isProcessado: false
    }; 

    
    for(let i of titulosPorLote) {
      titulo = new Titulo({
        idTitulo: i.idTitulo,
        idConta: pInputTitulo.idConta,
        idLote: pInputTitulo.idLote
      });

      await this.titulosRepository.atualizarVencimento(pUnitWork, titulo);
      
      aux = ({
        idTitulo: i.idTitulo,
        numeroTitulo: i.numeroTitulo,
        tipoTitulo: i.tipoTitulo,
        vencimento: i.vencimento,
        situacaoTitulo: i.situacaoTitulo,
        duplicataChaveNota: i.duplicataChaveNota,
        duplicataProtocoloNota: i.duplicataProtocoloNota,
        duplicataNumeroNota: i.duplicataNumeroNota,
        duplicataSerieNota: i.duplicataSerieNota,
        duplicataDataEmissao: i.duplicataDataEmissao,
        duplicataNumeroFatura: i.duplicataNumeroFatura,
        duplicataValorLiquidoFatura: i.duplicataValorLiquidoFatura,
        valorDoTitulo: i.valorDoTitulo,
        chequeCmc7: i.chequeCmc7,
        idConta: i.idConta,
        idPagador: i.idPagador,
        idLote: i.idLote,
        isProcessado: i.isProcessado
      });

      listaTitulos.push(aux);
    }

    if(titulosPorLote.length === 0) {
      throw new AcaoInvalida('Títulos já processados');
    }
    return listaTitulos;
  }
}