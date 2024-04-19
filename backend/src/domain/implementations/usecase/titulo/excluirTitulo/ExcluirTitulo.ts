// import UnitOfWork from '../../../entity/UnitOfWork';
import UnitOfWork from '../../../entity/UnitOfWork';
import ITituloRepository from '../../../../protocols/repository/tituloRepository';
import { ExcluirTituloInput } from './ExcluirTituloInput';
import { Titulo } from '../../../entity/objectValues/Titulo';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import ILoteRepository from '../../../../protocols/repository/loteRepository';
import AcaoInvalida from '../../../entity/errors/AcaoInvalida';

export class ExcluirTitulo {
  constructor(
    private titulosRepository: ITituloRepository,
    private loteRepository: ILoteRepository,
    private contaRepository: IContaRepository
  ) { }

  public async execute(pUnitOfWork: UnitOfWork, pInputTitulo: ExcluirTituloInput): Promise<boolean> {
    
    const titulo = new Titulo({
      idTitulo: pInputTitulo.idTitulo,
      idLote: pInputTitulo.idLote,
      idConta: pInputTitulo.idConta,
    });

    const isTituloExist = await this.titulosRepository.verificarSeExisteTitulo(pUnitOfWork, titulo);
    const isLoteExist = await this.loteRepository.buscaLotePorId(pUnitOfWork, pInputTitulo.idLote);
    const isUsuarioExist = await this.contaRepository.buscarUsuario(pUnitOfWork, pInputTitulo.idConta);

    if(!isUsuarioExist) {
      throw new InformacaoNaoEncontrada('Usuário não encontrado');
    }

    if(!isLoteExist) {
      throw new InformacaoNaoEncontrada('Lote não encontrado');
    }

    if(!isTituloExist) {
      throw new InformacaoNaoEncontrada('Titulo não encontrado');
    }

    if(isLoteExist.situacao === 'PROCESSADO') {
      throw new AcaoInvalida('Operação negada. Lote já processado');
    }
    
    const titulosPorLote = await this.titulosRepository.listarTitulosPorLote(pUnitOfWork, titulo.idLote, titulo.idConta);

    if(titulosPorLote.length === 1) {
      await this.titulosRepository.excluir(pUnitOfWork, pInputTitulo.idTitulo, pInputTitulo.idConta);
      await this.loteRepository.ExcluirLote(pUnitOfWork, pInputTitulo.idLote, pInputTitulo.idConta);
      return Promise.resolve(true);
    }

    const soma = titulosPorLote.reduce((total, valor) => total + valor.valorDoTitulo, 0) - isTituloExist.valorDoTitulo;   
    await this.titulosRepository.excluir(pUnitOfWork, pInputTitulo.idTitulo, pInputTitulo.idConta);
    await this.loteRepository.editarValorTotalDeTitulosPorLote(pUnitOfWork, pInputTitulo.idLote, soma, titulosPorLote.length - 1);

    return Promise.resolve(true);
  }
}