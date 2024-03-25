// import uuidUtil from '../../utils/uuid.utils';

// import Cliente from './Cliente';
// import Conta from './Conta';
// import Email from './Email';
// import Endereco from './Endereco';
// import Telefone from './Telefone';
// import Representante from './Representante';

// import { IPessoa, IPessoaModel } from '../../../protocols/models/entity/pessoa';

// export default class Pessoa implements IPessoa {
//   public idPessoa: string = uuidUtil.generateV7();

//   public nome: string = '';

//   public identificacao: string = '';

//   public nomeFantasia: string | null = null;

//   public inscricaoMunicipal: string | null = null;

//   public inscricaoEstadual: string | null = null;

//   public nomeMae: string | null = null;

//   public idConta: string = '';

//   public cliente: Cliente | null = null;

//   public conta: Conta | null = null;

//   public emails: Email[] | null = null;

//   public enderecos: Endereco[] | null = null;

//   public telefones: Telefone[] | null = null;

//   public representantes: Representante[] | null = null;

//   public createdAt?: Date | undefined;

//   public updatedAt?: Date | undefined;

//   constructor(pPessoa?: IPessoaModel) {
//     if (pPessoa === undefined) return;

//     this.idPessoa = pPessoa.idPessoa ? pPessoa.idPessoa : this.idPessoa;
//     this.nome = pPessoa.nome ? pPessoa.nome : this.nome;
//     this.identificacao = pPessoa.identificacao ? pPessoa.identificacao : this.identificacao;
//     this.nomeFantasia = pPessoa.nomeFantasia ? pPessoa.nomeFantasia : this.nomeFantasia;
//     this.inscricaoMunicipal = pPessoa.inscricaoMunicipal ? pPessoa.inscricaoMunicipal : this.inscricaoMunicipal;
//     this.inscricaoEstadual = pPessoa.inscricaoEstadual ? pPessoa.inscricaoEstadual : this.inscricaoEstadual;
//     this.nomeMae = pPessoa.nomeMae ? pPessoa.nomeMae : this.nomeMae;
//     this.idConta = pPessoa.idConta ? pPessoa.idConta : this.idConta;
//     this.createdAt = pPessoa.createdAt ? pPessoa.createdAt : this.createdAt;
//     this.updatedAt = pPessoa.updatedAt ? pPessoa.updatedAt : this.updatedAt;

//     this.cliente = pPessoa.cliente ? new Cliente(pPessoa.cliente) : this.cliente;
//     this.conta = pPessoa.conta ? new Conta(pPessoa.conta) : this.conta;
//     this.emails = pPessoa.emails ? pPessoa.emails.map((pEma) => new Email(pEma)) : this.emails;
//     this.enderecos = pPessoa.enderecos ? pPessoa.enderecos.map((pEnd) => new Endereco(pEnd)) : this.enderecos;
//     this.telefones = pPessoa.telefones ? pPessoa.telefones.map((pTel) => new Telefone(pTel)) : this.telefones;
//     this.representantes = pPessoa.representantes
//       ? pPessoa.representantes.map((pRep) => new Representante(pRep))
//       : this.representantes;
//   }
// }
