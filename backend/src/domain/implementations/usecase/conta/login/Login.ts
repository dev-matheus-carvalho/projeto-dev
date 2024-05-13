import UnitOfWork from '../../../entity/UnitOfWork';
import IContaRepository from '../../../../protocols/repository/contaRepository';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import { Conta } from '../../../entity/objectValues/Conta';
import senhaUtil from '../../../utils/senhaUtil';
import { LoginInput } from './LoginInput';
import { LoginOutput } from './LoginOutput';
import { ITokenService } from '../../../../protocols/services/token.service';

export class Login {
  constructor(
    private contaRepository: IContaRepository,
    private tokenService: ITokenService
  ) {
  }

  public async execute(pUnitOfWork: UnitOfWork, pInputConta: LoginInput): Promise<LoginOutput | null> {
    
    const senha = senhaUtil.criptografarSenha(pInputConta.senha);

    const isContaExist = await this.contaRepository.verificarContaExistente(pUnitOfWork, pInputConta.email);
    
    if(isContaExist === null) {
      throw new InformacaoNaoEncontrada('Email ou senha inválido.');
    }

    const contaDb = await this.contaRepository.verificaSenhaLogin(pUnitOfWork, pInputConta.email, senha);

    if (contaDb === null) {
      throw new InformacaoNaoEncontrada('Email ou senha inválido.');
    }

    const token = this.tokenService.criarToken(contaDb);

    return new LoginOutput(contaDb, token); 
  }
}