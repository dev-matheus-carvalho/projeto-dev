import IContaRepository from '../../../../protocols/repository/contaRepository';
import ICriptografiaServices from '../../../../protocols/services/criptografia.services';
import { ITokenService } from '../../../../protocols/services/token.service';
import IAssertsUtils from '../../../../protocols/utils/asserts.utils';
import UnitOfWork from '../../../entity/UnitOfWork';
import InformacaoNaoEncontrada from '../../../entity/errors/InfomacaoNaoEncontrada';
import LoginInput from './login.input';
import LoginOutput from './login.output';

export default class LoginUsecase {
  private readonly mensagemPadraoErro = 'E-mail não encontrado ou senha não inválida';

  constructor(
    private contaRepository: IContaRepository,
    private criptografiaService: ICriptografiaServices,
    private tokenServices: ITokenService,
    private assertUtils: IAssertsUtils,
  ) {}

  public async execute(pUnitOfWork: UnitOfWork, pInput: LoginInput): Promise<LoginOutput> {
    const contaDb = await this.contaRepository.buscaContaPorEmail(pUnitOfWork, pInput.email);
    this.assertUtils.naoNull(contaDb, new InformacaoNaoEncontrada(this.mensagemPadraoErro));

    const senhaDescriptografada = await this.criptografiaService.decriptografaSenhaFrontend(pInput.senhaCriptografada);
    this.assertUtils.naoNull(senhaDescriptografada, new InformacaoNaoEncontrada(this.mensagemPadraoErro));

    const senhaCriptografada = this.criptografiaService.criptografaSenha(senhaDescriptografada);

    if (senhaCriptografada !== contaDb.senha) {
      throw new InformacaoNaoEncontrada(this.mensagemPadraoErro);
    }

    const token = this.tokenServices.criarToken(contaDb);
    return new LoginOutput(token);
  }
}
