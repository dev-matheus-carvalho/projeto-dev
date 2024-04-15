// import UnitOfWork from '../../../entity/UnitOfWork';
import UnitOfWork from '../../../entity/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { ExcluirTituloInput } from './ExcluirTituloInput';
import { Titulo } from '../../../entity/objectValues/Titulo';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';

export class ExcluirTitulo {
  constructor(
    private titulosRepository: ITituloRepository,
    private contaRepository: IContaRepository
  ) { }

  public async execute(pUnitOfWork: UnitOfWork, pInputTitulo: ExcluirTituloInput): Promise<boolean> {
    
    const titulo = new Titulo({
      idTitulo: pInputTitulo.idTitulo,
      idConta: pInputTitulo.idConta,
    });

    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pInputTitulo.idConta);
    const tituloExist = await this.titulosRepository.verificarSeExisteTitulo(pUnitOfWork, titulo);

    if(!isUsuarioExist) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    if(!tituloExist) {
      throw new InformacaoNaoEncontrada('Titulo não encontrado');
    }

    this.titulosRepository.excluir(pUnitOfWork, pInputTitulo.idTitulo, pInputTitulo.idConta);

    return true;
  }
}