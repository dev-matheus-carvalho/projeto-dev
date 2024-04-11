import { DataTypes, Model, Sequelize } from 'sequelize';

import type Models from '../models';
import { IMovimentacao, IMovimentacaoModel, IMovimentacaoModelCreate } from '../../../domain/protocols/models/entity/objectValues/movimentacao';

export default class MovimentacaoSequelizeModel extends Model<IMovimentacao, IMovimentacaoModelCreate> implements IMovimentacaoModel {
  public idMovimentacao!: string;
  public saldo!: number;
  public valorTotalPrincipal!: number;
  public valorTotalMulta!: number;
  public valorTotalJuros!: number;
  public valorTotalDesconto!: number;
  public dataUltimoRecebimento!: Date;
  public statusRecebimento!: boolean;
  public idTitulo!: string;
  
  static initialization(sequelize: Sequelize): void {
    this.init(
      {
        idMovimentacao: {
          type: DataTypes.TEXT,
          primaryKey: true,
          allowNull: false,
        },
        saldo: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        valorTotalPrincipal: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        valorTotalMulta: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        valorTotalJuros: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        valorTotalDesconto: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        dataUltimoRecebimento: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        statusRecebimento: {
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
        tableName: 'movimentacao',
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
