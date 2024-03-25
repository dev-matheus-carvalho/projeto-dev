// import db from '../db';

// import Conta from '../../../domain/implementations/entity/objectValues/Conta';
// import IUnitOfWork from '../../../domain/protocols/models/UnitOfWork';
// import IContaRepository from '../../../domain/protocols/repository/contaRepository';

// export default class ContaSequelizeRepository implements IContaRepository {
//   public async buscaContaPorEmail(pUnitOfWork: IUnitOfWork, pEmail: string): Promise<Conta | null> {
//     const contaDb = await db.models.conta.findOne({
//       where: { email: pEmail },
//       transaction: pUnitOfWork.getTransition(),
//     });
//     return contaDb ? new Conta(contaDb) : null;
//   }

//   public async criar(pUnitOfWork: IUnitOfWork, pConta: Conta): Promise<Conta> {
//     const contaDb = await db.models.conta.create(pConta.retornaObjetoCriar(), {
//       transaction: pUnitOfWork.getTransition(),
//     });

//     return new Conta(contaDb);
//   }
// }
