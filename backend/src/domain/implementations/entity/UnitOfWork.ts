import { Transaction } from 'sequelize/types';
import ErroInterno from './errors/ErrorInterno';
import db from '../../../infra/sequelize/db';
import IUnitOfWork from '../../protocols/models/UnitOfWork';

export default class UnitOfWork implements IUnitOfWork {
  public readonly tokenAutohrization: string;
  private transition: Transaction | undefined;

  constructor(pTokenAuthorization: string) {
    this.tokenAutohrization = pTokenAuthorization;
  }

  public async init(): Promise<void> {
    if (this.transition !== undefined) {
      throw new ErroInterno('Operação já possui uma transition');
    }
    this.transition = await db.sequelize.transaction();
  }

  public async commit(): Promise<void> {
    if (this.transition) {
      await this.transition.commit();
      this.transition = undefined;
    }
  }

  public async rollBack(): Promise<void> {
    if (this.transition) {
      await this.transition.rollback();
      this.transition = undefined;
    }
  }

  public getTransition(): Transaction | undefined {
    return this.transition;
  }
}
