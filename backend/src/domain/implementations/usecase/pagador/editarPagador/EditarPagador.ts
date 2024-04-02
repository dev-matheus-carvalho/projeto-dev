import UnitOfWork from '../../../entity/UnitOfWork';
import { Pagador } from '../../../entity/objectValues/Pagador';
import IPagadorRepository from '../../../../protocols/repository/pagadorRepository';
import { EditarPagadorInput } from './EditarPagadorInput';

export class EditarPagador {
  constructor(private pagadorRepository: IPagadorRepository) {
  }

  public async execute(pUnitOfWork: UnitOfWork, pInputPagador: EditarPagadorInput): Promise<boolean> {
    
    const pagador = new Pagador({
      nome: pInputPagador.nome,
      identificacao: pInputPagador.identificacao,
      email: pInputPagador.email
    })

    console.log();
    console.log();
    console.log('Aqui fica o Pagador')
    console.log();
    console.log(pagador)
    console.log();
    console.log();

    const isPagadorExist = await this.pagadorRepository.listarPagadorPorIdentificacao(pagador.identificacao);

    console.log()
    console.log()
    console.log('Aqui fica o resultado se existe pagador')
    console.log()
    console.log(isPagadorExist)
    console.log()
    console.log()

    if (isPagadorExist) {
      await this.pagadorRepository.editar(pUnitOfWork, pagador);
      console.log('Caiu aqui')
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}