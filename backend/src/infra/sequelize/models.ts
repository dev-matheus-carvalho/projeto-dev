import { Sequelize } from 'sequelize/types';

import ContaSequelizeModel from './models/ContaSequelizeModels';
import PagadorSequelizeModel from './models/PagadorSequelizeModel';
import LoteSequelizeModel from './models/LoteSequelizeModel';
import TituloSequelizeModel from './models/TituloSequelizeModel';
import MovimentacaoSequelizeModel from './models/MovimentacaoSequelizeModel';
import LancamentosSequelizeModel from './models/LancamentosSequelizeModel';

export default class Models {
  public conta: typeof ContaSequelizeModel = ContaSequelizeModel;
  public pagador: typeof PagadorSequelizeModel = PagadorSequelizeModel;
  public lote: typeof LoteSequelizeModel = LoteSequelizeModel;
  public titulo: typeof TituloSequelizeModel = TituloSequelizeModel;
  public movimentacao: typeof MovimentacaoSequelizeModel = MovimentacaoSequelizeModel;
  public lancamentos: typeof LancamentosSequelizeModel = LancamentosSequelizeModel;


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
