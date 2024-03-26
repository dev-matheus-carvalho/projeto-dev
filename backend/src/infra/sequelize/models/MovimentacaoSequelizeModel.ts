import { DataTypes, Model, Sequelize } from 'sequelize';

import type Models from '../models';
import { ITitulo, ITituloModel, ITituloModelCreate } from '../../../domain/protocols/models/entity/objectValues/titulo';
import { IMovimentacao, IMovimentacaoModel, IMovimentacaoModelCreate } from '../../../domain/protocols/models/entity/objectValues/movimentacao';

export default class MovimentacaoSequelizeModel extends Model<IMovimentacao, IMovimentacaoModelCreate> implements IMovimentacaoModel {
  public idMovimentacao!: string;
  public saldo!: number;
  public valorTotalPrincipal!: number;
  public valorTotalMulta!: number;
  public valorTotalJuros!: number;
  public valorTotalDesconto!: number;
  public dataUltimoRecebimento?: Date;
  
  static initialization(sequelize: Sequelize): void {
    this.init(
      {
        idMovimentacao: {
          type: DataTypes.UUID,
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
    // this.belongsTo(pModels.lote, {
    //   as: 'lote',
    //   foreignKey: 'idSituacao',
    // });

  //   this.hasOne(pModels.cliente, {
  //     as: 'cliente',
  //     foreignKey: 'idPessoa',
  //   });

  //   this.hasMany(pModels.email, {
  //     as: 'emails',
  //     foreignKey: 'idPessoa',
  //   });

  //   this.hasMany(pModels.endereco, {
  //     as: 'enderecos',
  //     foreignKey: 'idPessoa',
  //   });

  //   this.hasMany(pModels.telefone, {
  //     as: 'telefones',
  //     foreignKey: 'idPessoa',
  //   });
  }
}
