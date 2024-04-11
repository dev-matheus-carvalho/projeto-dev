import { DataTypes, Model, Sequelize } from 'sequelize';

import type Models from '../models';
import { Ilancamentos, IlancamentosModel, IlancamentosModelCreate } from '../../../domain/protocols/models/entity/objectValues/lancamentos';

export default class LancamentosSequelizeModel extends Model<Ilancamentos, IlancamentosModelCreate> implements IlancamentosModel {
  public idLancamento!: string;
  public dataEvento!: Date;
  public dataCredito!: Date;
  public valorPrincipal!: number;
  public valorMulta!: number;
  public valorJuros!: number;
  public tipoPagamento!: string;
  public ativo!: boolean;
  public idTitulo!: string;
  
  static initialization(sequelize: Sequelize): void {
    this.init(
      {
        idLancamento: {
          type: DataTypes.TEXT,
          primaryKey: true,
          allowNull: false,
        },
        dataEvento: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        dataCredito: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        valorPrincipal: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        valorMulta: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        valorJuros: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        tipoPagamento: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        ativo: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        idTitulo: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'lancamentos',
        underscored: false,
        // indexes: [{ fields: ['idSituacao'] }],
      },
    );
  }

  static association(pModels: Models): void {
    this.belongsTo(pModels.titulo, {
      as: 'titulo',
      foreignKey: {
        field: 'idTitulo',
        name: 'idTitulo',
      },
    });
  }
}
