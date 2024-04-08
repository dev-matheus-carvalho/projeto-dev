import { DataTypes, Model, Sequelize } from 'sequelize';

import type Models from '../models';
import { ILote, ILoteModel, ILoteModelCreate } from '../../../domain/protocols/models/entity/objectValues/lote';

export default class LoteSequelizeModel extends Model<ILote, ILoteModelCreate> implements ILoteModel {
  public idLote!: string;
  public situacao!: string;
  public dataLote!: Date;
  public dataEnvio?: Date;
  public valorTotalTitulo!: number;
  public qtdTitulos!: number;
  public email!: string;

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
        email: {
          type: DataTypes.TEXT,
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
        field: 'email',
        name: 'email',
      },
    });

    this.hasMany(pModels.titulo, {
      as: 'titulo',
      foreignKey: {
        field: 'idLote',
        name: 'idLote',
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
