import { DataTypes, Model, Sequelize } from 'sequelize';

import type Models from '../models';
import { IPagador, IPagadorModel, IPagadorModelCreate } from '../../../domain/protocols/models/entity/objectValues/pagador';

export default class PagadorSequelizeModel extends Model<IPagador, IPagadorModelCreate> implements IPagadorModel {
  public nome!: string;
  public identificacao!: string;
  public email!: string;

  static initialization(sequelize: Sequelize): void {
    this.init(
      {
        nome: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        identificacao: {
          type: DataTypes.TEXT,
          primaryKey: true,
          allowNull: false
        },
        email: {
          type: DataTypes.TEXT,
          allowNull: false
        }
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'pagador',
        underscored: false,
        // indexes: [{ fields: ['idPagador'] }],
      },
    );
  }

  static association(pModels: Models): void {
    this.belongsTo(pModels.conta, {
      as: 'conta',
      foreignKey: {
        field: 'email',
        name: 'email',
      },
    });

    this.hasMany(pModels.titulo, {
      as: 'titulo',
      foreignKey: {
        field: 'identificacao',
        name: 'identificacao',
      },
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
