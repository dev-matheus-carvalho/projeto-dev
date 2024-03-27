import { DataTypes, Model, Sequelize } from 'sequelize';

import type Models from '../models';
import { IPagador, IPagadorModel, IPagadorModelCreate } from '../../../domain/protocols/models/entity/objectValues/pagador';

export default class PagadorSequelizeModel extends Model<IPagador, IPagadorModelCreate> implements IPagadorModel {
  public idPagador!: string;
  public nome!: string;
  public identificacao!: string;

  static initialization(sequelize: Sequelize): void {
    this.init(
      {
        idPagador: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        nome: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        identificacao: {
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
        field: 'idUsuario',
        name: 'idUsuario',
      },
    });

    this.hasMany(pModels.titulo, {
      as: 'titulo',
      foreignKey: {
        field: 'idPagador',
        name: 'idPagador',
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
