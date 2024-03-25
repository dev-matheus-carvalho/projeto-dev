import { DataTypes, Model, Sequelize } from 'sequelize';

import type Models from '../models';
import { IConta, IContaModel, IContaModelCreate } from '../../../domain/protocols/models/conta';

export default class ContaSequelizeModel extends Model<IConta, IContaModelCreate> implements IContaModel {
  public idUsuario!: string;
  public nome!: string;
  public email!: string;
  public senha!: string;

  static initialization(sequelize: Sequelize): void {
    this.init(
      {
        idUsuario: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        nome: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        email: {
          type: DataTypes.TEXT
        },
        senha: {
          type: DataTypes.TEXT,
          allowNull: false,
        }
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'conta',
        underscored: false,
        indexes: [{ fields: ['idUsuario'] }, { fields: ['email'] }],
      },
    );
  }

  static association(pModels: Models): void {
    this.belongsTo(pModels.conta, {
      as: 'conta',
      foreignKey: 'idUsuario',
    });

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
