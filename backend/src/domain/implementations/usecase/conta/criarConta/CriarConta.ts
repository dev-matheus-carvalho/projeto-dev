import UnitOfWork from '../../../entity/UnitOfWork';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import { Conta } from '../../../entity/objectValues/Conta';
import senhaUtil from '../../../utils/senhaUtil';
import { CriarContaInput } from './CriarContaInput';
import { CriarContaOutput } from './CriarContaOutput';
import InformacaoDuplicada from '../../../entity/errors/InformacaoDuplicada';
import { v4 } from 'uuid';

export class CriarConta {
  constructor(private contaRepository: IContaRepository) {
  }

  public async execute(pUnitOfWork: UnitOfWork, pInputConta: CriarContaInput): Promise<CriarContaOutput> {
    const conta = new Conta({
      idConta: v4(),
      email: pInputConta.email,
      nome: pInputConta.nome,
      senha: senhaUtil.criptografarSenha(pInputConta.senha),
    });

    const isContaExist = await this.contaRepository.verificarContaExistente(pUnitOfWork, pInputConta.email);
    
    if (!!isContaExist === true) {
      throw new InformacaoDuplicada('Conta duplicada');
    }
    const contaDb = await this.contaRepository.criar(pUnitOfWork, conta);
    return new CriarContaOutput(contaDb);

  }
}