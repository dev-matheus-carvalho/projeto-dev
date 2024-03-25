import { DataTypes, Model, Sequelize } from 'sequelize';

import type Models from '../models';
import { ISituacao, ISituacaoModel, ISituacaoModelCreate } from '../../../domain/protocols/models/lote';

export default class LoteSequelizeModel extends Model<ISituacao, ISituacaoModelCreate> implements ISituacaoModel {
  public idSituacao!: string;
  public dataLote!: Date;
  public dataEnvio!: Date;
  public valorTotalTitulo!: number;
  public qtdTitulos!: number;

  static initialization(sequelize: Sequelize): void {
    this.init(
      {
        idSituacao: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        dataLote: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        dataEnvio: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        valorTotalTitulo: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        qtdTitulos: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'lote',
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
