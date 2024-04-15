import UnitOfWork from '../../../entity/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import { EditarLoteInput } from './EditarLoteInput';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import AcaoInvalida from '../../../entity/errors/AcaoInvalida';
import { GerarData } from '../../../services/gerarData';

export class EditarLote {
  constructor(
    private tituloRepository: ITituloRepository, 
    private loteRepository: ILoteRepository
  ) {
  }
  
  public async execute(pUnitOfWork: UnitOfWork, pInputLote: EditarLoteInput): Promise<boolean> {
    const isLoteExist = await this.loteRepository.buscaLotePorId(pUnitOfWork, pInputLote.idLote);

    if(!isLoteExist) {
      throw new InformacaoNaoEncontrada('Lote não encontrado');
    }
      
    if(!isLoteExist.dataEnvio === null || !isLoteExist.dataEnvio === null) {
      throw new AcaoInvalida('Lote já foi processado');
    }

    const data = GerarData(new Date());
    await this.loteRepository.editarLoteParaProcessado(pUnitOfWork, pInputLote.idLote, pInputLote.idConta, data);
    await this.tituloRepository.editarSituacaoTitulos(pUnitOfWork, pInputLote.idLote, pInputLote.idConta);

    return Promise.resolve(true);
  }
}