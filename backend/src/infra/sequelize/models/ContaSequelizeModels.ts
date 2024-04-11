import { DataTypes, Model, Sequelize } from 'sequelize';

import type Models from '../models';
import { IConta, IContaModel, IContaModelCreate } from '../../../domain/protocols/models/entity/objectValues/conta';
import { ITitulo } from '../../../domain/protocols/models/entity/objectValues/titulo';

export default class ContaSequelizeModel extends Model<IConta, IContaModelCreate> implements IContaModel {
  public nome!: string;
  public email!: string;
  public senha!: string;
// public titulo!:ITitulo[] // Tem que colocar no model tambem

  static initialization(sequelize: Sequelize): void {
    this.init(
      {
        nome: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        email: {
          type: DataTypes.TEXT,
          primaryKey: true,
          allowNull: false,
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
        indexes: [{ fields: ['email'] }],
      },
    );
  }

  static association(pModels: Models): void {
    this.hasMany(pModels.pagador, {
      as: 'pagador',
      foreignKey: {
        field: 'email',
        name: 'email',
      },
    });

    this.hasMany(pModels.lote, {
      as: 'lote',
      foreignKey: {
        field: 'email',
        name: 'email',
      },
    });

    this.hasMany(pModels.titulo, {
      as: 'titulo',
      foreignKey: {
        field: 'email',
        name: 'email',
      },
    });
  }
}
