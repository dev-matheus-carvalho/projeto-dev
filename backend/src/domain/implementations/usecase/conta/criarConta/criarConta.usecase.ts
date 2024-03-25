import IContaRepository from '../../../../protocols/repository/contaRepository';
import ICriptografiaServices from '../../../../protocols/services/criptografia.services';

import UnitOfWork from '../../../entity/UnitOfWork';
import AcaoInvalida from '../../../entity/errors/AcaoInvalida';
import InformacaoDuplicada from '../../../entity/errors/InformacaoDuplicada';
import Conta from '../../../entity/objectValues/Conta';

import CriarContaInput from './criarConta.input';

export default class CriarContaUsecase {
  constructor(
    private contaRepository: IContaRepository,
    private criptografiaServices: ICriptografiaServices,
  ) {}

  public async execute(pUw: UnitOfWork, pInput: CriarContaInput): Promise<null> {
    const contaDb = await this.contaRepository.buscaContaPorEmail(pUw, pInput.email);
    if (contaDb !== null) {
      throw new InformacaoDuplicada('Conta já existe');
    }

    const senhaDescriptografada = await this.criptografiaServices.decriptografaSenhaFrontend(pInput.senhaCriptografada);
    if (senhaDescriptografada === null) {
      throw new AcaoInvalida('Senha inválida.');
    }

    const conta = new Conta({
      nome: pInput.nome,
      email: pInput.email,
      senha: this.criptografiaServices.criptografaSenha(senhaDescriptografada),
    });

    await this.contaRepository.criar(pUw, conta);
    return null;
  }
}
