import { DataTypes, Model, Sequelize } from 'sequelize';

import type Models from '../models';
import { IConta, IContaModel, IContaModelCreate } from '../../../domain/protocols/models/entity/objectValues/conta';
import { ITitulo } from '../../../domain/protocols/models/entity/objectValues/titulo';
import { IPagador } from '../../../domain/protocols/models/entity/objectValues/pagador';
import { ILote } from '../../../domain/protocols/models/entity/objectValues/lote';

export default class ContaSequelizeModel extends Model<IConta, IContaModelCreate> implements IContaModel {
  public idConta!: string;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public pagador!: IPagador[];
  public titulo!: ITitulo[];
  public lote!: ILote[];

  static initialization(sequelize: Sequelize): void {
    this.init(
      {
        idConta: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        nome: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        email: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        senha: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'conta',
        underscored: false,
        indexes: [ { fields: ['idConta'] } ],
      },
    );
  }

  static association(pModels: Models): void {
    this.hasMany(pModels.pagador, {
      as: 'pagador',
      foreignKey: {
        field: 'idConta',
        name: 'idConta',
      },
    });

    this.hasMany(pModels.lote, {
      as: 'lote',
      foreignKey: {
        field: 'idConta',
        name: 'idConta',
      },
    });

    this.hasMany(pModels.titulo, {
      as: 'titulo',
      foreignKey: {
        field: 'idConta',
        name: 'idConta',
      },
    });
  }
}
