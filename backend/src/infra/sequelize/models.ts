import { Sequelize } from 'sequelize/types';

import ContaSequelizeModel from './models/ContaSequelizeModels';
import PagadorSequelizeModel from './models/PagadorSequelizeModel';
import LoteSequelizeModel from './models/LoteSequelizeModel';

export default class Models {
  // public conta: typeof ContaSequelizeModel = ContaSequelizeModel;
  // public pagador: typeof PagadorSequelizeModel = PagadorSequelizeModel;
  // public lote: typeof LoteSequelizeModel = LoteSequelizeModel;


  constructor(sequelize: Sequelize) {
    Object.keys(this).forEach((pModel: string) => {
      if (this[pModel] !== undefined && this[pModel].initialization !== undefined) {
        this[pModel].initialization(sequelize);
      }
    });
    Object.keys(this).forEach((pModel: string) => {
      if (this[pModel] !== undefined && this[pModel].association !== undefined) {
        this[pModel].association(this);
      }
    });
  }
}
