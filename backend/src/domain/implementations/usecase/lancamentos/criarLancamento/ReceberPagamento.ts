import UnitOfWork from '../../../entity/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { v4 } from 'uuid';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import { FormatarData } from '../../../services/formatarData';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import { ReceberPagamentoInput } from './ReceberPagamentoInput';
import { Titulo } from '../../../entity/objectValues/Titulo';


export class CriarTitulo {
  constructor(
    private tituloRepository: ITituloRepository, 
    private loteRepository: ILoteRepository,
    private contaRepository: IContaRepository) {
  }
  public async execute(pUnitOfWork: UnitOfWork, pInputLancamento: ReceberPagamentoInput): Promise<boolean | any> {

    const dataRecebimento = FormatarData(pInputLancamento.dataEvento);
    const dataCredito = FormatarData(pInputLancamento.dataCredito);

    const titulo: Titulo = new Titulo({
      idTitulo: pInputLancamento.idTitulo,
    });

    const isTituloExist = await this.tituloRepository.verificarSeExisteTitulo(pUnitOfWork, titulo);
    
  }
}
