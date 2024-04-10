import UnitOfWork from '../../../entity/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import { EditarLoteInput } from './EditarLoteInput';

export class EditarLote {
  constructor(private tituloRepository: ITituloRepository, 
    private loteRepository: ILoteRepository) {
  }
  
  public async execute(pUnitOfWork: UnitOfWork, pInputLote: EditarLoteInput): Promise<boolean> {
    const isLoteExist = await this.loteRepository.buscaLotePorId(pInputLote.idLote);

    if(isLoteExist) {  
      if(isLoteExist.dataEnvio === null || isLoteExist.dataEnvio === undefined) {
        await this.loteRepository.editarLoteParaProcessado(pUnitOfWork, pInputLote.idLote, pInputLote.email);
        await this.tituloRepository.editarSituacaoTitulos(pUnitOfWork, pInputLote.idLote, pInputLote.email);
        return Promise.resolve(true);
      }
      return Promise.resolve(false);;
    }
    return Promise.resolve(false);;
  }
}