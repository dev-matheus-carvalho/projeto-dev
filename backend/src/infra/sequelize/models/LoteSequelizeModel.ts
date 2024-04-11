import { DataTypes, Model, Sequelize } from 'sequelize';

import type Models from '../models';
import { ILote, ILoteModel, ILoteModelCreate } from '../../../domain/protocols/models/entity/objectValues/lote';
import { ITitulo } from '../../../domain/protocols/models/entity/objectValues/titulo';

export default class LoteSequelizeModel extends Model<ILote, ILoteModelCreate> implements ILoteModel {
  public idLote!: string;
  public situacao!: string;
  public dataLote!: Date;
  public dataEnvio?: Date;
  public valorTotalTitulo!: number;
  public qtdTitulos!: number;
  public idConta!: string;
  public titulo!: ITitulo[];

  static initialization(sequelize: Sequelize): void {
    this.init(
      {
        idLote: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        situacao: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        dataLote: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        dataEnvio: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        valorTotalTitulo: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        qtdTitulos: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        idConta: {
          type: DataTypes.UUID,
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
    this.belongsTo(pModels.conta, {
      as: 'conta',
      foreignKey: {
        field: 'idConta',
        name: 'idConta',
      },
    });

    this.hasMany(pModels.titulo, {
      as: 'titulo',
      foreignKey: {
        field: 'idLote',
        name: 'idLote',
      },
    });
  }
}
