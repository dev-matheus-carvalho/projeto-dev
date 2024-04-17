// import { ValidadorDados } from '@decisaosistemas/typescript-validador-dados';
// import EntrypointData from '../../../entity/entryPoint/EntryPointData';
// import InformacaoNaoInfomada from '../../../entity/errors/InformacaoNaoInformada';

// export class ProcessarLoteInput {

//   public idLote: string;
//   public idConta: string;


//   public idLancamento: string;
//   public dataEvento: Date;
//   public dataCredito: Date;
//   public valorPrincipal: number;
//   public valorMulta: number;
//   public valorJuros: number;
//   public tipoPagamento: string;
//   public ativo: boolean;
//   public idTitulo: string;

//   constructor(pData: EntrypointData) {
//     const idLancamentoValidador = ValidadorDados.iniciar(pData.body?.idLancamento, 'body.idLancamento').obrigatorio().string();
//     const idContaValidador = ValidadorDados.iniciar(pData.body?.idConta, 'body.idConta').obrigatorio().string();
  
//     if (idLancamentoValidador.estaValido() === false) {
//       throw new InformacaoNaoInfomada(`O atributo "idLancamento": ${idLancamentoValidador.getErro()}`);
//     }
//     if (idContaValidador.estaValido() === false) {
//       throw new InformacaoNaoInfomada(`O atributo "idConta": ${idContaValidador.getErro()}`);
//     }

//     this.idLancamento = pData.body.idLancamento;
//     this.idConta = pData.body.idConta;
//   }
// }